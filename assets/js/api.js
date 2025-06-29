export async function sendReview({ personName, rating, comment }) {
  const response = await fetch("https://your-api-url.com/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personName,
      rating: parseInt(rating),
      comment
    })
  });

  if (!response.ok) {
    throw new Error("Failed to send review");
  }

  return await response.json();
}
