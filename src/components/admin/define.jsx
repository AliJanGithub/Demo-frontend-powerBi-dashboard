







   <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(user.isActive)}
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* <div className="text-right space-y-1">
                  <p className="text-xs text-gray-500">
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Access to {getUserAccess(user.id).length} dashboard(s)
                  </p>
                  <div className="flex items-center justify-end space-x-2 mt-2">
                    {user.role !== 'ADMIN' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleManageAccess(user)}
                        className="h-8"
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Manage Access
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMyUser(user._id)}
                      className="h-8 px-3 text-xs"
                    >
                     {loading ? 'Deleting…' : 'Delete user'}
                    </Button>
                  </div>
                </div> */}


 
<div className="text-right space-y-1">
      <p className="text-xs text-gray-500">
        Last login: {new Date(user.createdAt).toLocaleDateString()}
      </p>
      {/* <p className="text-xs text-gray-500">
        Access to {getUserAccess(user?.).length} dashboard(s)
      </p> */}
      <p className="text-xs text-gray-500">
       Member of {(user?.company.name)} 
      </p>

      <div className="flex items-center justify-end space-x-2 mt-2">
        {user.role !== "ADMIN" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleManageAccesss(user)}
            className="h-8"
          >
            <Settings className="h-3 w-3 mr-1" />
            Manage Access
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDeleteMyUser(user._id)}
          className="h-8 px-3 text-xs"
        >
          {loading ? "Deleting…" : "Delete user"}
        </Button>
      </div>

      {/* Department Selection Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[60vh] overflow-y-auto p-8">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-xl">Select Department</DialogTitle>
            {id && (
              <p className="text-gray-600 text-sm mt-2">
                Assigning access for:{" "}
                <span className="font-medium text-gray-900">
                  {id.name}
                </span>
              </p>
            )}
          </DialogHeader>

          {/* Department Selection Buttons */}
          <div className="flex flex-wrap gap-3 justify-center py-6">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDept === dept ? "default" : "outline"}
                onClick={() => setSelectedDept(dept)}
                className={`px-6 py-3 text-sm rounded-xl ${
                  selectedDept === dept
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelectedDept("");
                id(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirms} disabled={!selectedDept}>
              {loading ? "conFirming " : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>


              </div>
            ))}
          </div>