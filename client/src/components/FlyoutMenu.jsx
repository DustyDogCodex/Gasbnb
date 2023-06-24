function FlyoutMenu() {
    return (
        <div class="absolute -bottom-12 left-8 z-10 mt-5 flex max-w-[250px] -translate-x-2/3 translate-y-72 px-4">
            <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                    <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div>
                            <a href="#" class="font-semibold text-gray-900">
                                Analytics
                                <span class="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                    <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">  
                        <div>
                            <a href="#" class="font-semibold text-gray-900">
                                Engagement
                                <span class="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                    <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"> 
                        <div>
                            <a href="#" class="font-semibold text-gray-900">
                                Security
                                <span class="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                    <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div>
                            <a href="#" class="font-semibold text-gray-900">
                                Integrations
                                <span class="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                    <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                        <div>
                            <a href="#" class="font-semibold text-gray-900">
                                Automations
                                <span class="absolute inset-0"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlyoutMenu