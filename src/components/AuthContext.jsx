import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

  import { authApi } from '../lib/auth.api';




const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRoleUser,setUserRoleUser]=useState([])
  const [loadings, setLoading] = useState(true);
  const [error,setError]=useState(null)
    const [userLogo, setUserLogo] = useState(null);


  useEffect(() => {
    if(!localStorage.getItem('accessToken')) return
   getUsers()
   console.log("useeffect runs")
    setLoading(false);
  }, []);

  const fetchUserLogo = async (userId) => {
    try {
      const res = await authApi.getUserLogo(userId);
      // const base64 = await convertBlobToBase64(res);
      setUserLogo(res);
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  const uploadUserLogo = async (file) => {
    try {
      const res = await authApi.uploadUserLogo(file);
      // Backend should return updated user with logo info
      if (res?.data?.user) {
        setUser(res.data.user);
      }
      // Instantly update UI
      
      // const base64 = await convertBlobToBase64(file);
      setUserLogo(res);
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const convertBlobToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
    //    const handleUploadLogo = async (file) => {
  //   try {
  //     await authApi.uploadUserLogo(file);
  //     // showToast('Logo uploaded successfully!', 'success');

  //     // Refresh logo after upload
  //     if (user?._id) {
  //       const logoUrl = await authApi.getUserLogo(user._id);
  //       setUserLogo(logoUrl);
  //     }
  //   } catch (err) {
  //     console.error('Upload error:', err);
  //     // showToast(
  //     //   err.response?.data?.message || 'Failed to upload logo',
  //     //   'error'
  //     // );
  //   }
  // };
  //   const fetchUserLogo = async (userId) => {
  //   try {
  //     const logoUrl = await authApi.getUserLogo(userId);
  //     setUserLogo(logoUrl);
  //   } catch (err) {
  //     console.error('Fetch logo error:', err);
  //   }
  // };


 const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    // ✅ Log only the data part (safe)
    console.log("Login Response Data:", response.data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Invalid login credentials");
    }

    const { accessToken, refreshToken, user: userData } = response.data.data || {};

    if (!accessToken || !userData) {
      throw new Error("Invalid login response — missing tokens or user data");
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return { success: true, user: userData };
  } catch (error) {
    // ✅ Avoid logging entire error objects with circular refs
    console.error("Login failed:", error.message || error);

    return { success: false, error: error.message || "Login failed" };
  }
};


const getUsers=async()=>{
   setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users');
      const allUsers = response.data?.data?.users || [];
        console.log("all users inside auth context",allUsers)
      // ✅ Filter only those with role === 'USER'
      const filteredUsers = allUsers.filter(user => user.role =="USER");
  
      setUserRoleUser(filteredUsers);
      console.log("Filtered users:", filteredUsers);
      return filteredUsers;
    } catch (err) {
      console.error('Get users failed:', err);
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
}
  

const logout = async () => {
  try {
    // ✅ Get the token first, THEN remove it
    const refreshToken = localStorage.getItem('refreshToken');

    // Optional: tell backend to invalidate refresh token
    if (refreshToken) {
      await api.post('/auth/logout', { refreshToken });
    }

    // ✅ Clear all tokens and user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setUser(null);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};


  const acceptInvite = async (token, password, name) => {
    const response = await api.post('/auth/accept-invite', { token, password, name });
    const { accessToken, refreshToken, user: userData } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loadings, login, logout, acceptInvite,userRoleUser,userLogo,uploadUserLogo,fetchUserLogo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
