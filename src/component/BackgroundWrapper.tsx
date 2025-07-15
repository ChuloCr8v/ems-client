import type { ReactNode } from "react";


interface BackgroundWrapperProps {
  children: ReactNode;
}


const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {

    return (
        <div className='h-screen grid lg:grid-cols-2 w-full  relative overflow-hidden'>
            <div className=" overflow-hidden bg-white hidden lg:block"> 
                <div className="bg-white/50 h-full w-full absolute top-0 left-0 z-1 backdrop-blur-2xl"></div>
                <div className=" h-full w-full absolute top-0 left-0 z-1"></div>

                <div className="h-full w-full relative">
                    <div className="flex justify-center items-center h-full w-full">
                        <img
                            src="/login/login-image.png"
                            alt="Login visual"
                            className="w-[700px] h-auto object-cover z-20 "
                        />
                    </div>
                    <div className='w-[550px] h-[550px] rounded-full  bg-[#0A96CC]/30 backdrop-blur-3xl absolute right-0 bottom-0 z-0'></div>
                    <div className='w-[450px] h-[450px] rounded-full bg-[#40B554]/30 backdrop-blur-3xl absolute left-0 top-0 z-0'></div>
                </div>

            </div>

            <div className=" h-full flex  z-10 w-full  justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default BackgroundWrapper