import { Resend } from "resend";
import { NextResponse } from "next/server";
import { OrderConfirmationEmail } from "@/app/emails/OrderConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, customerName, orderId, items, totals, shipping } = body;

		const { data, error } = await resend.emails.send({
			from: "Audiophile <onboarding@resend.dev>",
			to: [email],
			subject: `Order Confirmation #${orderId} - Audiophile`,
			react: OrderConfirmationEmail({
				customerName,
				orderId,
				items,
				totals,
				shipping,
			}) as React.ReactElement,
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({ success: true, data });
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
