// Toast notifications
export function showSuccessToast(message: string) {
  // In a real app, this would use a toast library
  console.log("[Success]", message);
}

export function showErrorToast(message: string) {
  console.log("[Error]", message);
}

export function showInfoToast(message: string) {
  console.log("[Info]", message);
}

// Format utilities
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

// Status badge color mapping
export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "paid":
      return "bg-green-100 text-green-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    case "disputed":
      return "bg-purple-100 text-purple-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "open":
      return "bg-blue-100 text-blue-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    case "success":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Violation type color
export function getViolationTypeColor(type: string): string {
  switch (type?.toLowerCase()) {
    case "speeding":
      return "bg-red-100 text-red-800";
    case "red light violation":
      return "bg-orange-100 text-orange-800";
    case "no parking":
      return "bg-yellow-100 text-yellow-800";
    case "helmet not worn":
      return "bg-purple-100 text-purple-800";
    case "seat belt not worn":
      return "bg-pink-100 text-pink-800";
    case "rash driving":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
