# ConnectSphere 🌐

**ConnectSphere** is a feature-rich, responsive clone of LinkedIn built entirely with React.js. This project was developed as a capstone for the Web3 Bridge Bootcamp, demonstrating a strong foundation in modern frontend development, state management, and client-side data persistence.

**[(https://1connect-sphere.netlify.app/)]** 



---

## ✨ Features

-   **Authentication:**
    -   User sign-up with full name, title, occupation, and profile picture upload.
    -   Persistent sessions using `localStorage`.
-   **Posts & Feed:**
    -   Create posts with text content.
    -   Upload and display images and videos within posts.
    -   Pre-populated default posts for a rich user experience.
-   **Social Interaction:**
    -   Like/Unlike posts with a real-time counter.
    -   Comment on posts, with all comments displayed chronologically.
-   **Networking:**
    -   Add users from posts to your professional network.
    -   View your network on the "My Network" page.
    -   Remove connections from your network.
-   **Messaging:**
    -   Send direct messages to users from their posts.
    -   View all conversations on a functional "Messaging" page.
-   **Job Board:**
    -   Browse a list of available jobs.
    -   "Apply" for jobs and see your application status.
-   **UI/UX:**
    -   **Dark Mode & Light Mode:** Seamless theme switching.
    -   **Fully Responsive:** A clean and usable interface on all devices, from mobile to desktop, with a hamburger menu for smaller screens.

---

## 🛠️ Tech Stack

-   **[React.js](https://reactjs.org/):** Core frontend library for building the user interface.
-   **[React Router DOM](https://reactrouter.com/):** For client-side routing and navigation between pages.
-   **[Material-UI Icons](https://mui.com/):** For a clean and professional icon set.
-   **CSS3:** Custom styling with CSS variables for easy theming and responsiveness.
-   **Browser `localStorage` API:** Used as a client-side database to persist all user data, posts, and interactions.
-   **`FileReader` API:** To handle client-side image and video uploads by converting them to base64 data URLs.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
- `npm install npm@latest -g`

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/connectsphere.git](https://github.com/your-username/connectsphere.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd connectsphere
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Start the development server:**
    ```sh
    npm start
    ```
    The application will be running on `http://localhost:3000`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

-   This project was inspired by the curriculum and mentorship at the **Web3 Bridge Bootcamp**.
-   Images for default posts were sourced from **Unsplash** and **wikipedia**.