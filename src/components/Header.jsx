export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <strong>Rehacktor</strong>
        </li>
      </ul>

      <ul>
        <li>
          <a href="#" className="secondary">Services</a>
        </li>

        <li>
          <details className="dropdown">
            <summary>Account</summary>

            <ul dir="rtl">
              <li><a href="#">Profile</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}