function FlyoutMenu({ userInfo }) {
    //using userinfo to check if a user is logged in. Userinfo will be a blank object if no user is logged in which will translate to a falsy value and vice versa.

    return (
        <div className="absolute -bottom-12 left-12 z-10 mt-5 flex max-w-[200px] -translate-x-2/3 translate-y-28 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                    <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div>
                            <a href={ userInfo ? '/account' : '/register' } className="font-semibold text-gray-900">
                                {userInfo ? 'Account' : 'Signup'}
                                <span className="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                    <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">  
                        <div>
                            <a href={ userInfo ? '/account' : '/login' } className="font-semibold text-gray-900">
                                {userInfo ? 'Logout' : 'Login'}
                                <span className="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlyoutMenu