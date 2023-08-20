'use client'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const authCheck = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const session = useSession();

        if (!session) {
            router.push("/signin");
            return null;
        }

        return <WrappedComponent {...props} />;
    };
    
    return Wrapper;
};

export default authCheck;
