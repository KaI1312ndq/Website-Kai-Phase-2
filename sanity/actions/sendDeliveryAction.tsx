import { useState } from "react";
import type { DocumentActionComponent, DocumentActionProps } from "sanity";

/**
 * Sanity Studio document action — button "Gửi file qua email" hiện trên Order doc.
 * Click → call /api/orders/deliver same-origin → trigger Resend.
 */

export const sendDeliveryAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const { id, draft, published, onComplete } = props;
  const doc = (draft || published) as any;
  const [loading, setLoading] = useState(false);

  const deliveryStatus = doc?.deliveryStatus;
  const paymentStatus = doc?.paymentStatus;
  const alreadyDelivered = deliveryStatus === "delivered";

  return {
    label: loading
      ? "Đang gửi..."
      : alreadyDelivered
        ? "Đã gửi file (resend lại)"
        : "📧 Confirm & Send file",
    tone: alreadyDelivered ? "default" : "positive",
    disabled: loading || !id,
    onHandle: async () => {
      const confirmed = window.confirm(
        alreadyDelivered
          ? "Đã gửi file rồi. Gửi lại email nữa?"
          : `Xác nhận: đã nhận tiền cho đơn ${doc?.orderNumber}?\n\nClick OK để gửi email + file cho khách.`
      );
      if (!confirmed) {
        onComplete();
        return;
      }

      setLoading(true);
      try {
        // The doc ID may have "drafts." prefix — strip
        const realId = id.replace(/^drafts\./, "");
        const res = await fetch("/api/orders/deliver", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: realId }),
        });
        const data = await res.json();
        if (data.ok) {
          window.alert(
            `✓ Đã gửi email file cho ${data.email}!\n\nTrạng thái sẽ tự update trong Studio sau vài giây.`
          );
        } else {
          window.alert(`✗ Lỗi: ${data.error || "Unknown"}`);
        }
      } catch (e) {
        window.alert(`✗ Lỗi kết nối: ${e instanceof Error ? e.message : "Unknown"}`);
      } finally {
        setLoading(false);
        onComplete();
      }
    },
  };
};
