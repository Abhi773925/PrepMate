import React from 'react';

// Sample success stories
const successStories = [
  {
    name: "Aarav Patel",
    username: "@aaravp",
    body: "Thanks to this platform, I got my dream job as a software developer! The resources and support were incredible.",
    img: "https://avatar.vercel.sh/aarav",
  },
  {
    name: "Meera Sharma",
    username: "@meerash",
    body: "The resume builder helped me create a standout application. I received interview calls within days!",
    img: "https://avatar.vercel.sh/meera",
  },
  {
    name: "Rohan Verma",
    username: "@rohanv",
    body: "I struggled with interviews before joining this site. The coaching helped me gain confidence and ace my interviews.",
    img: "https://avatar.vercel.sh/rohan",
  },
  {
    name: "Priya Iyer",
    username: "@priyai",
    body: "With the personalized guidance, I refined my skills and secured a position in my desired field within weeks!",
    img: "https://avatar.vercel.sh/priya",
  },
];

const SuccessStoryCard = ({ img, name, username, body }) => {
  return (
    <div className="bg-[#1f1f1f] shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img className="w-12 h-12 rounded-full" src={img} alt={name} />
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-white">{username}</p>
        </div>
      </div>
      <p className="text-white-700">{body}</p>
    </div>
  );
};

const SuccessStories = () => {
  return (
    <section className="relative overflow-hidden py-12">
      <h2 className="text-3xl font-bold text-center mb-8 font-montserrat">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {successStories.map((story) => (
          <SuccessStoryCard key={story.username} {...story} />
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
