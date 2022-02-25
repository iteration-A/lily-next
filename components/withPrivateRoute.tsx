import Layout from "./Layout";

// this makes me sad... too ugly
export default (Component: any) => () =>
  (
    <Layout>
      <Component />
    </Layout>
  );
