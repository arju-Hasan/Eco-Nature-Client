const Footer = () => {
  return (
    <footer className="footer flex flex-col lg:flex-row lg:justify-between p-10 bg-base-200 text-base-content mt-10">
      <aside>
        <p className="text-2xl font-bold text-primary">HabitTracker</p>
        <p>
          Building better habits, one day at a time.
          <br />© 2025 Habit Tracker Inc. All rights reserved.
        </p>
      </aside>
      <nav>
        <header className="footer-title">Company</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <nav>
        <header className="footer-title">Social Media</header>
        <div className="grid grid-flow-col gap-4">
          <a>
            <svg
              xmlns="http://www.w.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M18.901 1.153H22.19l-4.22 4.83L22.98 22.84h-6.6l-4.99-6.7-4.14 6.7H1.02l4.63-5.3L1.18 1.15h6.7l4.37 5.8 3.94-5.8zM17.48 20.94h2.3l-9.8-13.4H7.8l9.68 13.4z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
