"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";


type ReviewFormProps = {
  studioId: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ReviewForm = ({ studioId }: ReviewFormProps) => {
  const { data: session, isPending } = authClient.useSession();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0 || !comment.trim()) {
      toast.error("Please provide a rating and review.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/studios/${studioId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p className="mt-5 text-sm text-slate-500">Checking session...</p>;
  }

  if (!session) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Want to share your experience?
        </h3>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Please sign in to write a review for this studio.
        </p>

        <Link
          href="/signin"
          className="btn mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Sign In to Write a Review
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
    >
      <div>
        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <MessageSquare size={20} className="text-emerald-500" />
          Write a Review
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Share your experience with this studio.
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Your Rating
        </label>

        <div className="rating rating-lg">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name={`rating-${studioId}`}
              className="mask mask-star-2 bg-amber-400"
              aria-label={`${value} star`}
              checked={rating === value}
              onChange={() => setRating(value)}
            />
          ))}
        </div>

        <p className="mt-2 text-xs text-slate-500">
          {rating > 0 ? `${rating} out of 5 stars` : "Select your rating"}
        </p>
      </div>

      <div>
        <label
          htmlFor="review"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Your Review
        </label>

        <textarea
          id="review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell others about your experience..."
          rows={4}
          required
          className="textarea textarea-bordered w-full resize-none bg-white dark:bg-slate-800"
        />
      </div>

      <button
        type="submit"
        disabled={loading || rating === 0 || !comment.trim()}
        className="btn w-full border-0 bg-gradient-to-r from-emerald-400 to-teal-500 text-[#04100e] hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;