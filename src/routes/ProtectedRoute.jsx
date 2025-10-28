// src/routes/ProtectedRoute.jsx
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Comp, ...rest }) {
  const token = useSelector((s) => s.client?.token);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Comp {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
    />
  );
}
