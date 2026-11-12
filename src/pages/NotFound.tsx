import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
    <Helmet>
      <title>Siden blev ikke fundet | Toolboks</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Siden blev ikke fundet</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Tilbage til forsiden
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
