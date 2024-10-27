# SkillSwap

SkillSwap is a peer-to-peer tutoring platform designed to connect users for real-time knowledge exchange. Built during **HackwithMAIT**, SkillSwap has made it to the **Top 50** out of 350 teams, showcasing the power of community-driven learning.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

---

## Features

### 1. Doubt-Raising Platform
SkillSwap’s primary feature allows users to raise questions (doubts) on a dedicated page, where they can share queries with descriptions, tags, and optional images. Other users can search for these questions, upvote them, and provide answers.

- **Ask a Doubt**: Easily raise new queries.
- **Search Doubts**: A search bar allows users to find relevant questions.
- **Doubt Status**: Indicate whether a doubt is “Solved” or “Active,” with users able to update this status.

### 2. Real-Time Chat System
Using **Firebase** and **Stream API**, we built a dynamic chat system for real-time communication:

- **All-Chat Page**: Connect with the SkillSwap community in an all-chat forum.
- **One-to-One Chat**: Initiate direct messaging with other users.
- **Messaging Interface**: Includes a messaging box with text and image options, notifications for unread messages, and typing indicators.

### 3. Video Calling
SkillSwap offers integrated **one-to-one video calling** using Agora SDK, allowing users to discuss questions face-to-face and gain clarity on topics.

- **Video Call Feature**: Launch one-on-one video calls from the single doubt page, creating a private room for each session.
- **Video & Audio Control**: Users can toggle audio and video, and exit the call at any time.

### 4. Interactive User Profiles
Every user has a customizable profile that displays their activity and personal information:

- **User Information**: Includes username, email, credits, subscription status, and profile image.
- **Activity Tracker**: Lists the user’s asked questions and upvotes received.

### 5. Rewards & Subscription System
To encourage learning and engagement, SkillSwap offers a rewards system:

- **Credit Points**: Earn credits through platform engagement, such as asking questions or helping other users.
- **Subscription Packages**: Different tiers of subscriptions unlock additional features, providing flexibility for all users.

### 6. Study Tools
A suite of study tools to enhance productivity and learning:

- **Timer**: Helps users focus with a timer for study sessions.
- **Whiteboard**: Interactive whiteboard feature for visual learners and group discussions.
- **Collaboration Tools**: Allows easy sharing of resources among users.

### 7. Intuitive Dashboard
With custom **Tailwind CSS** configurations, the dashboard presents a clean and organized layout, allowing users to seamlessly navigate through various features, including the main homepage, profile, rewards, and subscriptions.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Real-Time Communication**: Stream API, Agora SDK
- **Project Management**: Git and GitHub

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SkillSwap.git
   cd SkillSwap

Contributors
Sehaj Preet - Team Leader (www.linkedin.com/in/sehajmakkar)
Faiz Parvez
Siddharth Sharma
Ronit Mahawar
