import type { PostType } from "../types"

export const postsData: PostType[] = [
  {
    id: "3",
    user: {
      name: "John Doe",
      avatar: "/images/avatars/male-01.png",
    },
    updatedAt: new Date(),
    text: "Thrilled to announce that our company has successfully secured Series A funding! This milestone is a testament to the hard work and dedication of our team, and we’re excited for the journey ahead. Big thanks to our investors for believing in our vision. Onward to bigger challenges and greater success! 🚀",
    totalComments: 15,
    totalReposts: 5,
    totalLikes: 120,
    media: [
      { src: "/images/business-01.jpeg", alt: "" },
      { src: "/images/business-02.jpeg", alt: "" },
      { src: "/images/business-03.jpeg", alt: "" },
      { src: "/images/business-04.jpeg", alt: "" },
      { src: "/images/business-04.jpeg", alt: "" },
    ],
    visibility: "public",
    isLiked: true,
  },
  {
    id: "2",
    user: {
      name: "John Doe",
      avatar: "/images/avatars/male-01.png",
    },
    updatedAt: new Date(),
    text: "I’m grateful for the opportunity to attend this year’s industry conference. It was inspiring to hear from thought leaders and network with like-minded professionals. The future of technology is bright, and I’m excited to bring new insights back to our team.",
    totalComments: 25,
    totalReposts: 8,
    totalLikes: 150,
    visibility: "friends",
    isLiked: false,
  },
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/images/avatars/male-01.png",
    },
    text: "Just wrapped up an amazing project with my team at BigCompany. It’s been a challenging but rewarding experience that pushed us to think creatively and collaborate like never before. Proud of what we’ve accomplished together and looking forward to the next challenge!",
    updatedAt: new Date(),
    totalComments: 5,
    totalReposts: 1,
    totalLikes: 40,
    visibility: "private",
    isLiked: false,
  },
]
