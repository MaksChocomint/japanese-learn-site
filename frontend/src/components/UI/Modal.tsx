"use client";

import React, { ReactNode, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const searchParams = useSearchParams();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get("showModal");

  useEffect(() => {
    if (showModal === "y") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const modal: JSX.Element | null =
    showModal === "y" ? (
      <dialog
        ref={modalRef}
        className="rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <div className="bg-white p-6 flex flex-col">
          {children}
          <button
            onClick={(e) => closeModal(e)}
            className="mt-4 outline-none bg-red-600 w-1/3 self-center text-white px-4 py-2 rounded-lg"
          >
            ОК
          </button>
        </div>
      </dialog>
    ) : null;

  return modal;
};

export default Modal;
