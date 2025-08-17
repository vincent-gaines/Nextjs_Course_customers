import SideNav from '@/app/ui/dashboard/sidenav';

export const experimental_ppr = true;
  
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
/* To recap, you've done a few things to optimize data fetching in your application so far:

Created a database in the same region as your application code to reduce latency between your server and database.
1.Fetched data on the server with React Server Components. This allows you to keep expensive data fetches 
and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.
2.Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request 
and the amount of JavaScript needed to transform the data in-memory.
3.Parallelize data fetching with JavaScript - where it made sense to do so.
4.Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user 
to start interacting with the UI without waiting for everything to load.
5.Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic. */