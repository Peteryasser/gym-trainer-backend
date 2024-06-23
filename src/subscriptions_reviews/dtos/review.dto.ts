import { SubscriptionReview } from 'src/entity/subscription-review.entity';

export class ReviewDto {
  id: number;
  reviewerName: string;
  reviewerProfilePic: string;
  subscriptionId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(review: SubscriptionReview) {
    this.id = review.id;
    this.subscriptionId = review.subscriptionId;
    this.rating = review.rating;
    this.comment = review.comment;
    this.reviewerName = review.user.fullName;
    this.reviewerProfilePic = review.user.profilePictureUrl;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }
  static async fromEntity(review: SubscriptionReview): Promise<ReviewDto> {
    return new ReviewDto(review);
  }
}
