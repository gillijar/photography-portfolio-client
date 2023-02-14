import Cookies from "js-cookie";

const Dashboard = () => {
  const secureCookie = btoa(Cookies.get("admin"));
  const localId = process.env.REACT_APP_ADMIN_SECURE;
  const comparison = secureCookie === localId;

  return (
    <div>
      {!secureCookie && <p>401 Unauthorized</p>}
      {secureCookie && !comparison && <p>401 Unauthorized</p>}
      {secureCookie && comparison && <p>This is the dashboard</p>}
    </div>
  );
};

export default Dashboard;
