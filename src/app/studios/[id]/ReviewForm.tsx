"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Star } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { API_BASE_URL } from "@/app/lib/api";
import { toast } from "sonner";

type ReviewFormProps = {
  studioId: string;
};

type Review = {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const getStudioReviews = async (
  studioId: string,
  signal?: AbortSignal
): Promise<Review[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/studios/${studioId}/reviews`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

const ReviewForm = ({ studioId }: ReviewFormProps) => {
  const { data: session, isPending } = authClient.useSession();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getStudioReviews(studioId, controller.signal)
      .then(setReviews)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch studio reviews:", error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setFetching(false);
        }
      });

    return () => controller.abort();
  }, [studioId]);

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

      setReviews(await getStudioReviews(studioId));
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

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Customer Reviews ({reviews.length})
        </h3>

        {fetching ? (
          <p className="text-sm text-slate-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-slate-500">
            No reviews have been submitted yet.
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {review.userName}
                  </h4>

                  <span className="text-xs text-slate-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      size={16}
                      className={
                        value <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {!session ? (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
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
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
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
      )}
    </div>
  );
};

export default ReviewForm;