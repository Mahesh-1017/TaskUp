import type { Contact, Message } from './types';

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Alex Doe',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Sounds good! See you then.',
    lastMessageTimestamp: '10:40 AM',
  },
  {
    id: '2',
    name: 'Samantha Bee',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'I\'ve shared the document with you.',
    lastMessageTimestamp: 'Yesterday',
  },
  {
    id: '3',
    name: 'Jordan Smith',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Check out this video!',
    lastMessageTimestamp: 'Wednesday',
  },
  {
    id: '4',
    name: 'Casey Miller',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Photo',
    lastMessageTimestamp: 'Tuesday',
  },
];

export const messages: Record<string, Message[]> = {
  '1': [
    { id: 'm1-1', sender: 'contact', type: 'text', content: 'Hey, are we still on for lunch tomorrow?', timestamp: '10:30 AM' },
    { id: 'm1-2', sender: 'me', type: 'text', content: 'Yes, absolutely! 1 PM at The Usual Spot?', timestamp: '10:35 AM' },
    { id: 'm1-3', sender: 'contact', type: 'text', content: 'Sounds good! See you then.', timestamp: '10:40 AM' },
  ],
  '2': [
    { id: 'm2-1', sender: 'contact', type: 'text', content: 'Hey, I finished the project proposal. Let me know what you think.', timestamp: 'Yesterday' },
    { id: 'm2-2', sender: 'contact', type: 'document', content: 'Project_Proposal_v2.pdf', timestamp: 'Yesterday' },
    { id: 'm2-3', sender: 'me', type: 'text', content: 'Thanks! I\'ll review it tonight.', timestamp: 'Yesterday' },
  ],
  '3': [
    { id: 'm3-1', sender: 'contact', type: 'text', content: 'You have to see this video, it\'s hilarious!', timestamp: 'Wednesday' },
    { id: 'm3-2', sender: 'contact', type: 'video', content: 'https://placehold.co/600x400.png', timestamp: 'Wednesday' },
    { id: 'm3-3', sender: 'me', type: 'text', content: 'Haha, that\'s great!', timestamp: 'Wednesday' },
  ],
  '4': [
    { id: 'm4-1', sender: 'contact', type: 'text', content: 'Here\'s that photo from our trip!', timestamp: 'Tuesday' },
    { id: 'm4-2', sender: 'contact', type: 'image', content: 'https://placehold.co/600x400.png', timestamp: 'Tuesday' },
  ],
  'long': [
    { id: 'long-1', sender: 'contact', type: 'text', content: 'Hey, I wanted to discuss the Q3 marketing strategy. I was thinking we could focus more on social media engagement rather than traditional ads. The ROI seems much better, especially with the younger demographic.', timestamp: '9:00 AM' },
    { id: 'long-2', sender: 'me', type: 'text', content: 'That\'s an interesting point. Do we have the data to back that up from our last campaign?', timestamp: '9:05 AM' },
    { id: 'long-3', sender: 'contact', type: 'text', content: 'Yes, I\'ve attached the performance report. You\'ll see that the cost per acquisition for social media was almost 40% lower. Plus, the engagement metrics were through the roof.', timestamp: '9:07 AM' },
    { id: 'long-4', sender: 'contact', type: 'document', content: 'Q2_Campaign_Report.docx', timestamp: '9:07 AM' },
    { id: 'long-5', sender: 'me', type: 'text', content: 'Wow, those numbers are compelling. I agree, we should pivot. What platforms are you thinking? Instagram and TikTok?', timestamp: '9:15 AM' },
    { id: 'long-6', sender: 'contact', type: 'text', content: 'Exactly. We can create some short-form video content and maybe partner with a few micro-influencers in our niche to get the ball rolling.', timestamp: '9:20 AM' },
    { id: 'long-7', sender: 'me', type: 'text', content: 'Great plan. Let\'s put together a formal proposal and budget for this and present it to the team next week.', timestamp: '9:25 AM' },
    { id: 'long-8', sender: 'contact', type: 'text', content: 'Perfect. I\'ll start drafting it now. I think this could be a huge win for us.', timestamp: '9:26 AM' },
  ]
};

contacts.push({
    id: 'long',
    name: 'Long Conversation',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Perfect. I\'ll start drafting it now.',
    lastMessageTimestamp: '9:26 AM',
});
