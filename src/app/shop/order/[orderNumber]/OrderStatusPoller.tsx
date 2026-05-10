"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Poll status mỗi 15 giây — khi Quảng confirm thanh toán + gửi email,
 * trang tự refresh để hiện trạng thái mới mà user không phải reload tay.
 */
export default function OrderStatusPoller({
  orderNumber,
  initialPaid,
  initialDelivered,
}: {
  orderNumber: string;
  initialPaid: boolean;
  initialDelivered: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (initialDelivered) return; // already done, no need poll
    const interval = setInterval(() => {
      router.refresh();
    }, 15000);
    return () => clearInterval(interval);
  }, [initialDelivered, router, orderNumber]);

  return null;
}
