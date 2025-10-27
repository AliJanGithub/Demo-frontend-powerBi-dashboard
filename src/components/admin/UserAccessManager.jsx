import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {  Settings, Users } from "lucide-react";
import { useToast } from "../ToastProvider";
import { useDashboards } from "../DashboardContext"; // assuming you have it
import api from "../../lib/api"; // axios instance
import { Badge } from "../ui/badge";

export function UserAccessManager({ user, handleDeleteMyUser }) {
    console.log("usersssssssssssssss accesssss",user)
  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboards, setSelectedDashboards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const { assignDashboard } = useDashboards();
  const { showToast } = useToast();

  const departments = ["FINANCE", "SALES", "MARKETING", "HR", "GENERAL", "OTHER"];

  // 🔹 Fetch dashboards of selected department
  useEffect(() => {
    const fetchDashboards = async () => {
      if (!selectedDept) return;
      setLoading(true);
      try {
        const response = await api.get(`/dashboards/department/${selectedDept}`);
        setDashboards(response.data.data.dashboard || []);
        console.log("mmmmmmmmmy dashbpoard response",response.data.data.dashboard)
      } catch (err) {
        console.error("Error fetching dashboards:", err);
        showToast("Failed to load dashboards");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboards();
  }, [selectedDept]);

  // 🔹 Handle manage access click
  const handleManageAccesss = () => {
    setOpen(true);
  };

  // 🔹 Toggle individual dashboard
  const toggleDashboard = (id) => {
    setSelectedDashboards((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // 🔹 Select or unselect all dashboards
  const handleSelectAll = () => {
    if (selectedDashboards.length === dashboards.length) {
      setSelectedDashboards([]);
    } else {
      setSelectedDashboards(dashboards.map((d) => d._id));
    }
  };

  // 🔹 Confirm assignment
  const handleConfirms = async () => {
    if (!selectedDept) return alert("Please select a department first!");
    try {
      setAssigning(true);

      await assignDashboard(
        [user._id],
        selectedDept,
        selectedDashboards // ✅ send selected dashboards
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
  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case false:
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

return (
  <>
    {/* --- User Row Card --- */}
    <div
      className="
        flex items-center justify-between 
        bg-white/70 backdrop-blur-sm 
        border border-gray-100 rounded-2xl 
        p-5 shadow-sm hover:shadow-lg 
        hover:scale-[1.01] transition-all duration-200 ease-in-out 
        cursor-pointer
      "
    >
      {/* LEFT SIDE — user info */}
      <div className="flex items-center space-x-4">
        <div
          className="
            bg-gradient-to-tr from-blue-500 to-indigo-400 
            p-3 rounded-full shadow-md flex items-center justify-center
          "
        >
          <Users className="h-5 w-5 text-white" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 tracking-tight">
            {user.name}
          </h3>
          <p className="text-xs text-gray-500">{user.email}</p>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge(user.isActive)}
            <Badge
              variant="outline"
              className="text-xs border-blue-200 text-blue-700 bg-blue-50"
            >
              {user.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — actions */}
      <div className="flex flex-col items-end space-y-1 text-right">
        <p className="text-[11px] text-gray-400 italic">
          Last login: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-[11px] text-gray-400">
          Member of <span className="font-medium">{user?.company?.name}</span>
        </p>

        <div className="flex items-center space-x-2 mt-2">
          {user.role !== "ADMIN" && (
            <Button
              size="sm"
              onClick={() => setOpen(true)}
              className="
                h-8 px-3 text-xs 
                bg-gradient-to-r from-blue-500 to-indigo-500 
                text-white hover:from-indigo-600 hover:to-blue-600
                shadow-sm rounded-md
              "
            >
              <Settings className="h-3 w-3 mr-1" />
              Manage
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteMyUser(user._id)}
            className="
              h-8 px-3 text-xs border-red-200 text-red-600 hover:bg-red-50 
              rounded-md
            "
          >
            {loading ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </div>

    {/* --- Manage Access Dialog --- */}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-4xl max-h-[70vh] overflow-y-auto 
          p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl
        "
      >
        <DialogHeader className="pb-6 border-b">
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Manage Access
          </DialogTitle>
          <p className="text-gray-600 text-sm mt-2">
            Assign dashboards for{" "}
            <span className="font-semibold text-gray-900">{user.name}</span>
          </p>
        </DialogHeader>

        {/* Department Buttons */}
        <div className="flex flex-wrap gap-3 justify-center text-black py-5">
          {departments.map((dept) => (
            <Button
              key={dept}
              onClick={() => {
                setSelectedDept(dept);
                setSelectedDashboards([]);
              }}
              className={`
                px-5 py-2 text-sm font-medium rounded-xl 
                transition-all duration-150 text-black
                ${
                  selectedDept === dept
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-black shadow-md"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }
              `}
            >
             <p className="text-black">{dept}</p>
            </Button>
          ))}
        </div>

        {/* Dashboards List */}
        {selectedDept && (
          <div className="border-t pt-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Dashboards in {selectedDept}
              </h3>
              {dashboards.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-sm"
                >
                  {selectedDashboards.length === dashboards.length
                    ? "Unselect All"
                    : "Select All"}
                </Button>
              )}
            </div>

            {loading ? (
              <p className="text-gray-500 text-sm">Loading dashboards...</p>
            ) : dashboards.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dashboards.map((db) => (
                  <div
                    key={db._id}
                    onClick={() => toggleDashboard(db._id)}
                    className={`
                      cursor-pointer rounded-xl p-4 
                      border transition-all duration-150
                      ${
                        selectedDashboards.includes(db._id)
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    <h4 className="text-sm font-medium text-gray-900">
                      {db.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {db.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No dashboards found.
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setSelectedDept("");
              setDashboards([]);
              setSelectedDashboards([]);
            }}
            className="hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirms}
            disabled={!selectedDept || assigning}
            className="
              bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
              hover:from-indigo-700 hover:to-blue-700 shadow-md
            "
          >
            {assigning ? "Assigning..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </>
);


}
