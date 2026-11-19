import PaymentForm from "./PaymentForm"

interface PaymentPageProps {
  searchParams: Promise<{
    canceled?: string
  }>
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return <PaymentForm />
}
