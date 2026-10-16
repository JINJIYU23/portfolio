import Footer from "./layout/Footer";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";
import useSmoothScroll from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Layout />
      <Footer />
    </>
  );
}
