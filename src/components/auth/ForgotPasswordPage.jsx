// // import React, { useState } from 'react';
// // import { useAuth } from '../AuthContext';
// // import { useToast } from '../ToastProvider';
// // import { Button } from '../ui/button';
// // import { Input } from '../ui/input';
// // import { Label } from '../ui/label';
// // import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../ui/card';
// // import { Alert, AlertDescription } from '../ui/alert';
// // import { Loader2, Mail, CheckCircle } from '../icons/Icons';
// // import { Logo } from '../Logo';
// // import { useNavigate } from 'react-router-dom';

// // export function ForgotPasswordPage() {
// //   const { forgotPassword } = useAuth();
// //   const { showToast } = useToast();
// //   const [email, setEmail] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isSuccess, setIsSuccess] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError('');

// //     try {
// //       const result = await forgotPassword(email);
// //       if (result.success) {
// //         setIsSuccess(true);
// //         showToast('Password reset email sent');
// //       } else {
// //         setError(result.error || 'Failed to send reset email');
// //       }
// //     } catch (err) {
// //       setError('An unexpected error occurred');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
// // const navigate=useNavigate()
// //   if (isSuccess) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
// //         <div className="w-full max-w-md space-y-8">
// //           <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
// //             <CardContent className="pt-8 text-center space-y-4">
// //               <div className="flex justify-center">
// //                 <div className="bg-success p-4 rounded-full shadow-lg">
// //                   <CheckCircle className="h-10 w-10 text-white" />
// //                 </div>
// //               </div>
// //               <div>
// //                 <h2 className="text-xl text-gray-900 mb-2">Email Sent!</h2>
// //                 <p className="text-gray-600 mb-4">
// //                   We've sent a password reset link to <strong>{email}</strong>
// //                 </p>
// //                 <p className="text-sm text-gray-500">
// //                   Please check your email and follow the instructions to reset your password.
// //                 </p>
// //               </div>
// //               <div className="pt-4">
// //                 <Button 
// //                   variant="outline" 
// //                   className="w-full"
// //                   onClick={() => navigate('/login')}
// //                 >
// //                   Back to Login
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
// //       <div className="w-full max-w-md space-y-8">
// //         <div className="text-center">
// //           <div className="flex justify-center mb-6">
// //             <Logo size="xl" />
// //           </div>
// //           <h1 className="text-2xl tracking-tight text-gray-900">Reset Password</h1>
// //           <p className="mt-2 text-gray-600">Enter your email to receive a password reset link</p>
// //         </div>

// //         <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
// //           <CardHeader className="text-center pb-2">
// //             <CardTitle className="flex items-center justify-center gap-2 text-2xl text-gray-900">
// //               <Mail className="h-6 w-6 text-primary" />
// //               Forgot Password
// //             </CardTitle>
// //             <CardDescription className="text-gray-600">
// //               We'll send you a link to reset your password
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               {error && (
// //                 <Alert variant="destructive">
// //                   <AlertDescription>{error}</AlertDescription>
// //                 </Alert>
// //               )}

// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email Address</Label>
// //                 <Input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   placeholder="your.email@company.com"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <Button type="submit" className="w-full" disabled={isLoading}>
// //                 {isLoading ? (
// //                   <>
// //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                     Sending Reset Link...
// //                   </>
// //                 ) : (
// //                   'Send Reset Link'
// //                 )}
// //               </Button>

// //               <div className="text-center">
// //                 <button 
// //                   onClick={() => navigate('login')}
// //                   className="text-blue-600 hover:text-blue-800 text-sm hover:underline bg-transparent border-0 cursor-pointer"
// //                 >
// //                   Back to Sign In
// //                 </button>
// //               </div>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }





















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '../ToastProvider'; // Assuming this provides showToast
// import { authApi } from '../../lib/auth.api'; // Updated import path
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../ui/card';
// import { Alert, AlertDescription } from '../ui/alert';
// import { Loader2, Mail, CheckCircle, Lock } from '../icons/Icons';
// import { Logo } from '../Logo';

// // Helper to get query params (like the 'token') from the URL
// const useQuery = () => {
//   return new URLSearchParams(window.location.search);
// };

// export function ForgotPasswordPage() {
//     const navigate = useNavigate();
//     const { showToast } = useToast();
//     const query = useQuery();
//     const resetToken = query.get('token');
//        console.log(resetToken)
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
    
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);

//     const isResetMode = !!resetToken;
    
//     // --- State 1: Request Password Reset Link (Forgot Password) ---
//     const handleForgotPasswordRequest = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             // Hitting the POST /auth/forgot-password route
//             const result = await authApi.forgotPasswordRequest(email);
            
//             // Note: Backend should return a success message regardless of email existence for security
//             if (result.success) {
//                 setIsSuccess(true);
//                 showToast(result.message || 'Password reset email sent');
//             } else {
//                 // This path should ideally not be hit if the backend handles enumeration correctly
//                 setError(result.message || 'Failed to send reset email');
//             }
//         } catch (err) {
//             // Display generic message if request fails (network error, etc.)
//             const errorMessage = err.response?.data?.message || 'Failed to process request. Please try again.';
//             setError(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // --- State 2: Reset Password with Token ---
//     const handlePasswordReset = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match.");
//             setIsLoading(false);
//             return;
//         }
//         if (newPassword.length < 8) { // Basic validation
//              setError("Password must be at least 8 characters long.");
//              setIsLoading(false);
//              return;
//         }
          
//         try {
//             // Hitting the POST /auth/reset-password/:token route
//             const result = await authApi.resetPassword(resetToken, newPassword);
            
//             if (result.success && result.data.accessToken && result.data.refreshToken) {
//                 // Successful reset also logs the user in (based on your backend structure)
//                 localStorage.setItem('accessToken', result.data.accessToken);
//                 localStorage.setItem('refreshToken', result.data.refreshToken);
//                 localStorage.setItem('user', JSON.stringify(result.data.user)); // Store user data
                
//                 showToast('Password reset successful. Welcome back!');
                
//                 // Navigate to dashboard or secure page
//                 navigate('/'); 
//             } else {
//                 setError(result.message || 'Failed to reset password. Token may be invalid.');
//             }
//         } catch (err) {
//           console.log(err)
//             const errorMessage = err.response?.data?.message || 'Invalid or expired token. Please request a new link.';
//             setError(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     // --- Success View (for Email Request only) ---
//     if (isSuccess && !isResetMode) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
//                 <div className="w-full max-w-md space-y-8">
//                     <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
//                         <CardContent className="pt-8 text-center space-y-4">
//                             <div className="flex justify-center">
//                                 <div className="bg-green-500 p-4 rounded-full shadow-lg">
//                                     <CheckCircle className="h-10 w-10 text-white" />
//                                 </div>
//                             </div>
//                             <div>
//                                 <h2 className="text-xl text-gray-900 mb-2">Email Sent!</h2>
//                                 <p className="text-gray-600 mb-4">
//                                     If an account with that email exists, a password reset link has been sent.
//                                 </p>
//                                 <p className="text-sm text-gray-500">
//                                     Please check your spam folder if you don't see it within a few minutes.
//                                 </p>
//                             </div>
//                             <div className="pt-4">
//                                 <Button 
//                                     variant="outline" 
//                                     className="w-full"
//                                     onClick={() => navigate('/login')}
//                                 >
//                                     Back to Login
//                                 </Button>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         );
//     }
    
//     // --- Main View (Forgot or Reset Mode) ---
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
//             <div className="w-full max-w-md space-y-8">
//                 <div className="text-center">
//                     <div className="flex justify-center mb-6">
//                         <Logo size="xl" />
//                     </div>
//                     <h1 className="text-2xl tracking-tight text-gray-900">
//                         {isResetMode ? 'Set New Password' : 'Reset Password'}
//                     </h1>
//                     <p className="mt-2 text-gray-600">
//                         {isResetMode ? 'Enter and confirm your new password.' : 'Enter your email to receive a password reset link.'}
//                     </p>
//                 </div>

//                 <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
//                     <CardHeader className="text-center pb-2">
//                         <CardTitle className="flex items-center justify-center gap-2 text-2xl text-gray-900">
//                             {isResetMode ? <Lock className="h-6 w-6 text-primary" /> : <Mail className="h-6 w-6 text-primary" />}
//                             {isResetMode ? 'Password Reset' : 'Forgot Password'}
//                         </CardTitle>
//                         <CardDescription className="text-gray-600">
//                             {isResetMode ? 'Token found. Set your new password now.' : 'We will email you instructions.'}
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={isResetMode ? handlePasswordReset : handleForgotPasswordRequest} className="space-y-4">
//                             {error && (
//                                 <Alert variant="destructive">
//                                     <AlertDescription>{error}</AlertDescription>
//                                 </Alert>
//                             )}

//                             {/* Email Input (Forgot Password Mode) */}
//                             {!isResetMode && (
//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email Address</Label>
//                                     <Input
//                                         id="email"
//                                         name="email"
//                                         type="email"
//                                         placeholder="your.email@company.com"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                         disabled={isLoading}
//                                     />
//                                 </div>
//                             )}

//                             {/* Password Inputs (Reset Password Mode) */}
//                             {isResetMode && (
//                                 <>
//                                     <div className="space-y-2">
//                                         <Label htmlFor="newPassword">New Password</Label>
//                                         <Input
//                                             id="newPassword"
//                                             type="password"
//                                             placeholder="Enter new password (min 8 chars)"
//                                             value={newPassword}
//                                             onChange={(e) => setNewPassword(e.target.value)}
//                                             required
//                                             disabled={isLoading}
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <Label htmlFor="confirmPassword">Confirm Password</Label>
//                                         <Input
//                                             id="confirmPassword"
//                                             type="password"
//                                             placeholder="Confirm new password"
//                                             value={confirmPassword}
//                                             onChange={(e) => setConfirmPassword(e.target.value)}
//                                             required
//                                             disabled={isLoading}
//                                         />
//                                     </div>
//                                 </>
//                             )}

//                             <Button type="submit" className="w-full" disabled={isLoading}>
//                                 {isLoading ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         {isResetMode ? 'Resetting Password...' : 'Sending Reset Link...'}
//                                     </>
//                                 ) : (
//                                     isResetMode ? 'Set New Password' : 'Send Reset Link'
//                                 )}
//                             </Button>

//                             <div className="text-center">
//                                 <button 
//                                     onClick={() => navigate('/login')}
//                                     className="text-blue-600 hover:text-blue-800 text-sm hover:underline bg-transparent border-0 cursor-pointer"
//                                     type="button"
//                                 >
//                                     Back to Sign In
//                                 </button>
//                             </div>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../ToastProvider';
import { authApi } from '../../lib/auth.api';

export function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { showToast } = useToast();
    
    const resetToken = searchParams.get('token');
    console.log(resetToken);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const isResetMode = !!resetToken;
    
    // --- State 1: Request Password Reset Link (Forgot Password) ---
    const handleForgotPasswordRequest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Hitting the POST /auth/forgot-password route
            const result = await authApi.forgotPasswordRequest(email);
            
            // Note: Backend should return a success message regardless of email existence for security
            if (result.success) {
                setIsSuccess(true);
                showToast(result.message || 'Password reset email sent');
            } else {
                // This path should ideally not be hit if the backend handles enumeration correctly
                setError(result.message || 'Failed to send reset email');
            }
        } catch (err) {
            // Display generic message if request fails (network error, etc.)
            const errorMessage = err.response?.data?.message || 'Failed to process request. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // --- State 2: Reset Password with Token ---
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }
        if (newPassword.length < 8) { // Basic validation
             setError("Password must be at least 8 characters long.");
             setIsLoading(false);
             return;
        }
          
        try {
            // Hitting the POST /auth/reset-password/:token route
            const result = await authApi.resetPassword(resetToken, newPassword);
            
            if (result.success && result.data.accessToken && result.data.refreshToken) {
                // Successful reset also logs the user in (based on your backend structure)
                localStorage.setItem('accessToken', result.data.accessToken);
                localStorage.setItem('refreshToken', result.data.refreshToken);
                localStorage.setItem('user', JSON.stringify(result.data.user)); // Store user data
                
                showToast('Password reset successful. Welcome back!');
                
                // Navigate to dashboard or secure page
                navigate('/'); 
            } else {
                setError(result.message || 'Failed to reset password. Token may be invalid.');
            }
        } catch (err) {
          console.log(err)
            const errorMessage = err.response?.data?.message || 'Invalid or expired token. Please request a new link.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Custom Logo Component
    const CustomLogo = () => (
        <div className="flex items-center space-x-2">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-2xl">BP</span>
            </div>
            <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    BI Portal
                </h1>
                <p className="text-sm text-gray-500">365 Dashboard</p>
            </div>
        </div>
    );

    // --- Success View (for Email Request only) ---
    if (isSuccess && !isResetMode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
                <div className="w-full max-w-md">
                    {/* Success Card */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8 text-center">
                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-500 p-4 rounded-full shadow-lg">
                                    <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Success Message */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Email Sent!</h2>
                            <p className="text-gray-600 mb-4">
                                If an account with that email exists, a password reset link has been sent.
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                Please check your spam folder if you don't see it within a few minutes.
                            </p>
                            
                            {/* Back to Login Button */}
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // --- Main View (Forgot or Reset Mode) ---
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <CustomLogo />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {isResetMode ? 'Set New Password' : 'Reset Password'}
                    </h1>
                    <p className="text-gray-600">
                        {isResetMode ? 'Enter and confirm your new password.' : 'Enter your email to receive a password reset link.'}
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {/* Card Header with Icon */}
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-4">
                                {isResetMode ? (
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {isResetMode ? 'Password Reset' : 'Forgot Password'}
                            </h2>
                            <p className="text-gray-500 mt-1">
                                {isResetMode ? 'Token found. Set your new password now.' : 'We will email you instructions.'}
                            </p>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-red-700 font-medium">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={isResetMode ? handlePasswordReset : handleForgotPasswordRequest} className="space-y-6">
                            {/* Email Input (Forgot Password Mode) */}
                            {!isResetMode && (
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your.email@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Inputs (Reset Password Mode) */}
                            {isResetMode && (
                                <>
                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="newPassword"
                                                type="password"
                                                placeholder="Enter new password (min 8 chars)"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                disabled={isLoading}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm new password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                disabled={isLoading}
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {isResetMode ? 'Resetting Password...' : 'Sending Reset Link...'}
                                    </div>
                                ) : (
                                    isResetMode ? 'Set New Password' : 'Send Reset Link'
                                )}
                            </button>

                            {/* Back to Login Link */}
                            <div className="text-center pt-2">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
                                    type="button"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}