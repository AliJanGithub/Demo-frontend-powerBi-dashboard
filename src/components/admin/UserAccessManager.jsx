// import React, { useState, useEffect } from "react";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
// import {  Settings, Users } from "lucide-react";
// import { useToast } from "../ToastProvider";
// import { useDashboards } from "../DashboardContext"; // assuming you have it
// import api from "../../lib/api"; // axios instance
// import { Badge } from "../ui/badge";

// export function UserAccessManager({ user, handleDeleteMyUser }) {
//     console.log("usersssssssssssssss accesssss",user)
//   const [open, setOpen] = useState(false);
//   const [selectedDept, setSelectedDept] = useState("");
//   const [dashboards, setDashboards] = useState([]);
//   const [selectedDashboards, setSelectedDashboards] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [assigning, setAssigning] = useState(false);

//   const { assignDashboard } = useDashboards();
//   const { showToast } = useToast();

//   const departments = ["FINANCE", "SALES", "MARKETING", "HR", "GENERAL", "OTHER"];

//   // 🔹 Fetch dashboards of selected department
//   useEffect(() => {
//     const fetchDashboards = async () => {
//       if (!selectedDept) return;
//       setLoading(true);
//       try {
//         const response = await api.get(`/dashboards/department/${selectedDept}`);
//         setDashboards(response.data.data.dashboard || []);
//         console.log("mmmmmmmmmy dashbpoard response",response.data.data.dashboard)
//       } catch (err) {
//         console.error("Error fetching dashboards:", err);
//         showToast("Failed to load dashboards");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboards();
//   }, [selectedDept]);

//   // 🔹 Handle manage access click
//   const handleManageAccesss = () => {
//     setOpen(true);
//   };

//   // 🔹 Toggle individual dashboard
//   const toggleDashboard = (id) => {
//     setSelectedDashboards((prev) =>
//       prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
//     );
//   };

//   // 🔹 Select or unselect all dashboards
//   const handleSelectAll = () => {
//     if (selectedDashboards.length === dashboards.length) {
//       setSelectedDashboards([]);
//     } else {
//       setSelectedDashboards(dashboards.map((d) => d._id));
//     }
//   };

//   // 🔹 Confirm assignment
//   const handleConfirms = async () => {
//     if (!selectedDept) return alert("Please select a department first!");
//     try {
//       setAssigning(true);

//       await assignDashboard(
//         [user._id],
//         selectedDept,
//         selectedDashboards // ✅ send selected dashboards
//       );

//       showToast("Successfully assigned dashboards to user");
//       setOpen(false);
//       setSelectedDept("");
//       setDashboards([]);
//       setSelectedDashboards([]);
//     } catch (error) {
//       console.error(error);
//       showToast("Assignment failed");
//     } finally {
//       setAssigning(false);
//     }
//   };
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case true:
//         return <Badge className="bg-green-100 text-green-800">Active</Badge>;
//       case false:
//         return <Badge variant="secondary">Inactive</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

// return (
//   <>
//     {/* --- User Row Card --- */}
//     <div
//       className="
//         flex items-center justify-between 
//         bg-white/70 backdrop-blur-sm 
//         border border-gray-100 rounded-2xl 
//         p-5 shadow-sm hover:shadow-lg 
//         hover:scale-[1.01] transition-all duration-200 ease-in-out 
//         cursor-pointer
//       "
//     >
//       {/* LEFT SIDE — user info */}
//       <div className="flex items-center space-x-4">
//         <div
//           className="
//             bg-gradient-to-tr from-blue-500 to-indigo-400 
//             p-3 rounded-full shadow-md flex items-center justify-center
//           "
//         >
//           <Users className="h-5 w-5 text-white" />
//         </div>

//         <div>
//           <h3 className="text-base font-semibold text-gray-900 tracking-tight">
//             {user.name}
//           </h3>
//           <p className="text-xs text-gray-500">{user.email}</p>
//           <div className="flex items-center space-x-2 mt-1">
//             {getStatusBadge(user.isActive)}
//             <Badge
//               variant="outline"
//               className="text-xs border-blue-200 text-blue-700 bg-blue-50"
//             >
//               {user.role}
//             </Badge>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE — actions */}
//       <div className="flex flex-col items-end space-y-1 text-right">
//         <p className="text-[11px] text-gray-400 italic">
//           Last login: {new Date(user.createdAt).toLocaleDateString()}
//         </p>
//         <p className="text-[11px] text-gray-400">
//           Member of <span className="font-medium">{user?.company?.name}</span>
//         </p>

//         <div className="flex items-center space-x-2 mt-2">
//           {user.role !== "ADMIN" && (
//             <Button
//               size="sm"
//               onClick={() => setOpen(true)}
//               className="
//                 h-8 px-3 text-xs 
//                 bg-gradient-to-r from-blue-500 to-indigo-500 
//                 text-white hover:from-indigo-600 hover:to-blue-600
//                 shadow-sm rounded-md
//               "
//             >
//               <Settings className="h-3 w-3 mr-1" />
//               Manage
//             </Button>
//           )}

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleDeleteMyUser(user._id)}
//             className="
//               h-8 px-3 text-xs border-red-200 text-red-600 hover:bg-red-50 
//               rounded-md
//             "
//           >
//             {loading ? "Deleting…" : "Delete"}
//           </Button>
//         </div>
//       </div>
//     </div>

//     {/* --- Manage Access Dialog --- */}
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent
//         className="
//           max-w-4xl max-h-[70vh] overflow-y-auto 
//           p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl
//         "
//       >
//         <DialogHeader className="pb-6 border-b">
//           <DialogTitle className="text-2xl font-bold text-blue-600">
//             Manage Access
//           </DialogTitle>
//           <p className="text-gray-600 text-sm mt-2">
//             Assign dashboards for{" "}
//             <span className="font-semibold text-gray-900">{user.name}</span>
//           </p>
//         </DialogHeader>

//         {/* Department Buttons */}
//         <div className="flex flex-wrap gap-3 justify-center text-black py-5">
//           {departments.map((dept) => (
//             <Button
//               key={dept}
//               onClick={() => {
//                 setSelectedDept(dept);
//                 setSelectedDashboards([]);
//               }}
//               className={`
//                 px-5 py-2 text-sm font-medium rounded-xl 
//                 transition-all duration-150 text-black
//                 ${
//                   selectedDept === dept
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-black shadow-md"
//                     : "bg-white border text-gray-700 hover:bg-gray-50"
//                 }
//               `}
//             >
//              <p className="text-black">{dept}</p>
//             </Button>
//           ))}
//         </div>

//         {/* Dashboards List */}
//         {selectedDept && (
//           <div className="border-t pt-5">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Dashboards in {selectedDept}
//               </h3>
//               {dashboards.length > 0 && (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handleSelectAll}
//                   className="text-sm"
//                 >
//                   {selectedDashboards.length === dashboards.length
//                     ? "Unselect All"
//                     : "Select All"}
//                 </Button>
//               )}
//             </div>

//             {loading ? (
//               <p className="text-gray-500 text-sm">Loading dashboards...</p>
//             ) : dashboards.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {dashboards.map((db) => (
//                   <div
//                     key={db._id}
//                     onClick={() => toggleDashboard(db._id)}
//                     className={`
//                       cursor-pointer rounded-xl p-4 
//                       border transition-all duration-150
//                       ${
//                         selectedDashboards.includes(db._id)
//                           ? "border-blue-500 bg-blue-50 shadow-md"
//                           : "border-gray-200 hover:bg-gray-50"
//                       }
//                     `}
//                   >
//                     <h4 className="text-sm font-medium text-gray-900">
//                       {db.title}
//                     </h4>
//                     <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                       {db.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm italic">
//                 No dashboards found.
//               </p>
//             )}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
//           <Button
//             variant="outline"
//             onClick={() => {
//               setOpen(false);
//               setSelectedDept("");
//               setDashboards([]);
//               setSelectedDashboards([]);
//             }}
//             className="hover:bg-gray-100"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirms}
//             disabled={!selectedDept || assigning}
//             className="
//               bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
//               hover:from-indigo-700 hover:to-blue-700 shadow-md
//             "
//           >
//             {assigning ? "Assigning..." : "Confirm"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   </>
// );


// }
import React, { useState, useEffect } from "react";
import { useToast } from "../ToastProvider";
import { useDashboards } from "../DashboardContext";
import api from "../../lib/api";

export function UserAccessManager({ user, handleDeleteMyUser }) {
  console.log("usersssssssssssssss accesssss", user);
  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboards, setSelectedDashboards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const { assignDashboard } = useDashboards();
  const { showToast } = useToast();

  const departments = ["FINANCE", "SALES", "MARKETING", "HR", "GENERAL", "OTHER"];
if (!user) {
    return null; // Or return a placeholder
  }
  // Fetch dashboards of selected department
  useEffect(() => {
    const fetchDashboards = async () => {
      if (!selectedDept) return;
      setLoading(true);
      try {
        const response = await api.get(`/dashboards/department/${selectedDept}`);
        setDashboards(response.data.data.dashboard || []);
        console.log("mmmmmmmmmy dashboard response", response.data.data.dashboard);
      } catch (err) {
        console.error("Error fetching dashboards:", err);
        showToast("Failed to load dashboards");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboards();
  }, [selectedDept]);

  // Handle manage access click
  const handleManageAccesss = () => {
    setOpen(true);
  };

  // Toggle individual dashboard
  const toggleDashboard = (id) => {
    setSelectedDashboards((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Select or unselect all dashboards
  const handleSelectAll = () => {
    if (selectedDashboards.length === dashboards.length) {
      setSelectedDashboards([]);
    } else {
      setSelectedDashboards(dashboards.map((d) => d._id));
    }
  };

  // Confirm assignment
  const handleConfirms = async () => {
    if (!selectedDept) {
      showToast("Please select a department first!");
      return;
    }
    try {
      setAssigning(true);
      await assignDashboard(
        [user._id],
        selectedDept,
        selectedDashboards
      );
      showToast("Successfully assigned dashboards to user");
      setOpen(false);
      setSelectedDept("");
      setDashboards([]);
      setSelectedDashboards([]);
    } catch (error) {
      console.error(error);
      showToast("Assignment failed");
    } finally {
      setAssigning(false);
    }
  };

  // Custom Badge Component
  const CustomBadge = ({ children, variant = "default", className = "" }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const variants = {
      default: "bg-blue-100 text-blue-700",
      secondary: "bg-gray-100 text-gray-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700",
      outline: "bg-white border border-gray-300 text-gray-700"
    };
    
    return (
      <span className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    if (status === true) {
      return <CustomBadge variant="success">Active</CustomBadge>;
    } else {
      return <CustomBadge variant="secondary">Inactive</CustomBadge>;
    }
  };

  return (
    <>
      {/* User Row Card */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
        {/* Left side - User info */}
        <div className="flex items-center space-x-4">
          {/* User avatar - Replace with backend image if available */}
          <div className="relative">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="h-12 w-12 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-full flex items-center justify-center shadow-md">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              {getStatusBadge(user.isActive)}
              <CustomBadge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                {user.role}
              </CustomBadge>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-col items-end space-y-1">
          <p className="text-xs text-gray-400">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          {user.company?.name && (
            <p className="text-xs text-gray-400">
              Company: <span className="font-medium">{user.company.name}</span>
            </p>
          )}

          <div className="flex items-center space-x-2 mt-2">
            {user.role !== "ADMIN" && (
              <button
                onClick={handleManageAccesss}
                className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg"
              >
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage Access
              </button>
            )}

         <button
  onClick={() => handleDeleteMyUser(user._id)}
  className="flex items-center px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs rounded-lg"
>
  <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  Delete
</button>
          </div>
        </div>
      </div>

      {/* Manage Access Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Manage Access</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Assign dashboards for <span className="font-semibold text-gray-900">{user.name}</span>
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Department Selection */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Select Department</h3>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept);
                      setSelectedDashboards([]);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedDept === dept
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboards List */}
            {selectedDept && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dashboards in {selectedDept}
                  </h3>
                  {dashboards.length > 0 && (
                    <button
                      onClick={handleSelectAll}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {selectedDashboards.length === dashboards.length ? "Unselect All" : "Select All"}
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : dashboards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboards.map((db) => (
                      <div
                        key={db._id}
                        onClick={() => toggleDashboard(db._id)}
                        className={`cursor-pointer p-4 border rounded-lg transition-all ${
                          selectedDashboards.includes(db._id)
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedDashboards.includes(db._id)}
                            onChange={() => toggleDashboard(db._id)}
                            className="h-4 w-4 text-blue-600 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{db.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{db.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 mt-2">No dashboards found in this department</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    setSelectedDept("");
                    setDashboards([]);
                    setSelectedDashboards([]);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirms}
                  disabled={!selectedDept || assigning}
                  className={`px-4 py-2 rounded-lg ${
                    !selectedDept || assigning
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {assigning ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Assigning...
                    </span>
                  ) : (
                    "Confirm Assignment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}