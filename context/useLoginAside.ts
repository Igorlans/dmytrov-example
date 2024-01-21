import {create} from "zustand";

interface LoginAsideState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useLoginAside = create<LoginAsideState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpenBool) =>
        set(() => ({
            isOpen: isOpenBool
        })),
}));

export default useLoginAside;