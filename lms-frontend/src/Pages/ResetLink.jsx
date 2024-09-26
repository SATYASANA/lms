import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout';
import { resetPasswordByEmail } from '../Redux/Slices/AuthSlice';

export default function ResetLink() {
    const { Token } = useParams();
    const dispatch = useDispatch();
    const [resetPassword, setResetPassword] = useState({ password: '', resetToken: Token });
    const [isLoading, setIsLoading] = useState(false);

    function handleInput(e) {
        const { name, value } = e.target;
        setResetPassword({ ...resetPassword, [name]: value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!resetPassword.password) {
            toast.error("Password field can't be empty");
            return;
        }

        setIsLoading(true);
        await dispatch(resetPasswordByEmail([resetPassword, resetPassword.resetToken]));
        setIsLoading(false);
    }

    return (
        <HomeLayout>
            <div className='min-h-[90vh] flex justify-center items-center'>
                <form onSubmit={onFormSubmit}>
                    <h1>Reset Password</h1>
                    <input
                        type="password"
                        name='password'
                        value={resetPassword.password}
                        onChange={handleInput}
                        placeholder="Enter your new password"
                    />
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}
