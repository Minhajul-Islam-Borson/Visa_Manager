import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const DashboardLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (

    <div className="min-h-screen bg-slate-100">


      {/* Sidebar */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />



      {/* Main Area */}

      <div className="flex flex-col min-h-screen">


        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />



        <main className="flex-1 p-6">

          <Outlet />

        </main>


      </div>


    </div>

  );
};


export default DashboardLayout;