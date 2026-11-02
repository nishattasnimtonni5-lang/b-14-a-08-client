"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  date: z
    .string()
    .min(1, "Please select a booking date."),
  
  time: z
    .string()
    .min(1, "Please select a booking time."),

})

export function BookingForm({studioId}:{studioId:string}) {
    const [showForm,setShowForm]=useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      time: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try{
        const res=await fetch("http://localhost:5000/api/bookings"
        ,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                studioId,
                date:data.date,
                time:data.time
            })
        })
        if(!res.ok){
          throw new Error("Booking failed")
        }
    
    toast.success("Booking submitted successfully!", {
      description: `Date: ${data.date} | Time: ${data.time}`,
    });

    console.log(data);
    form.reset();
    setShowForm(false);
  } catch (error){
toast.error("Failed to submit booking.Please try again.")
console.error(error)
  }
  }
if(!showForm){
    return(
        <Button type="button" className="mt-5 w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 py-3 text-sm font-semibold text-[#04100e]" 
        onClick={()=>setShowForm(true)}>Book this studio</Button>
    )
}
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Studio Booking</CardTitle>
        <CardDescription>
          Select your preferred booking date and time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="booking-date">
                  Booking date
                  </FieldLabel>
                  <Input
                    {...field}
                    id="booking-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                   
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="booking-time">
                    Booking time
                  </FieldLabel>
                  <Input
                      {...field}
                      id="booking-time"
                     type="time"
                      aria-invalid={fieldState.invalid}
                    />
                   
                      
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => {form.reset();setShowForm(false)}}>
            Cancel
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}