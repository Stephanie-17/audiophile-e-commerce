import * as React from "react";
import {
	Html,
	Head,
	Body,
	Container,
	Section,
	Text,
	Link,
	Row,
	Column,
} from "@react-email/components";

interface OrderConfirmationEmailProps {
	customerName: string;
	orderId: string;
	items: Array<{
		name: string;
		price: number;
		quantity: number;
		image: string;
	}>;
	totals: {
		subtotal: number;
		shipping: number;
		vat: number;
		grandTotal: number;
	};
	shipping: {
		address: string;
		city: string;
		zipCode: string;
		country: string;
	};
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
	customerName,
	orderId,
	items,
	totals,
	shipping,
}) => (
	<Html>
		<Head />
		<Body style={main}>
			<Container style={container}>
				<Section style={header}>
					<Text style={logoStyle}>Audiophile</Text>
				</Section>

				<Section style={centerAlign}>
					<div style={successIcon}>
						<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 2L2 7v10c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7l-10-5zm-1 16.5l-4-4 1.41-1.41L11 15.68l6.59-6.59L19 10.5l-8 8z"
								fill="white"
							/>
						</svg>
					</div>

					<Text style={h1Style}>Thank You For Your Order!</Text>
					<Text style={orderIdStyle}>
						Order ID: <strong>#{orderId}</strong>
					</Text>
					<Text style={thankYouTextStyle}>
						Hi {customerName}, your order has been confirmed and will be shipped
						soon.
					</Text>
				</Section>

				<Section style={section}>
					<Text style={sectionTitleStyle}>Order Items</Text>
					{items.map((item, index) => (
						<Row key={index} style={itemRow}>
							<Column style={itemDetails}>
								<Text style={itemNameStyle}>{item.name}</Text>
								<Text style={itemPriceStyle}>
									$ {item.price.toLocaleString()}
								</Text>
							</Column>
							<Column width={50} style={itemQuantity}>
								<Text style={itemQuantityTextStyle}>x{item.quantity}</Text>
							</Column>
						</Row>
					))}
				</Section>

				<Section style={totalsSection}>
					<Row style={totalRow}>
						<Column>
							<Text style={totalLabelStyle}>Subtotal</Text>
						</Column>
						<Column width={100}>
							<Text style={totalValueStyle}>
								$ {totals.subtotal.toLocaleString()}
							</Text>
						</Column>
					</Row>
					<Row style={totalRow}>
						<Column>
							<Text style={totalLabelStyle}>Shipping</Text>
						</Column>
						<Column width={100}>
							<Text style={totalValueStyle}>
								$ {totals.shipping.toLocaleString()}
							</Text>
						</Column>
					</Row>
					<Row style={totalRow}>
						<Column>
							<Text style={totalLabelStyle}>VAT (Included)</Text>
						</Column>
						<Column width={100}>
							<Text style={totalValueStyle}>
								$ {totals.vat.toLocaleString()}
							</Text>
						</Column>
					</Row>
					<Row style={grandTotalRow}>
						<Column>
							<Text style={grandTotalLabelStyle}>Grand Total</Text>
						</Column>
						<Column width={100}>
							<Text style={grandTotalValueStyle}>
								$ {totals.grandTotal.toLocaleString()}
							</Text>
						</Column>
					</Row>
				</Section>

				<Section style={section}>
					<Text style={sectionTitleStyle}>Shipping Address</Text>
					<Section style={shippingInfo}>
						<Text style={shippingTextStyle}>{shipping.address}</Text>
						<Text style={shippingTextStyle}>
							{shipping.city}, {shipping.zipCode}
						</Text>
						<Text style={shippingTextStyle}>{shipping.country}</Text>
					</Section>
				</Section>

				<Section style={centerAlign}>
					<Link href="https://audiophile-e-commerce-lovat.vercel.app/" style={buttonStyle}>
						Shop more!
					</Link>
				</Section>

				<Section style={footer}>
					<Text style={footerTextStyle}>
						Thank you for shopping with Audiophile!
					</Text>
					<Text style={footerTextStyle}>
						If you have any questions, please contact us at{" "}
						<Link href="mailto:support@audiophile.com" style={linkStyle}>
							support@audiophile.com
						</Link>
					</Text>
					<Text style={copyrightStyle}>
						© 2025 Audiophile. All rights reserved.
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

// Base styles
const main = {
	backgroundColor: "#f6f9fc",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
	margin: "0",
	padding: "0",
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px",
	maxWidth: "600px",
	borderRadius: "8px",
	boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const header = {
	textAlign: "center" as const,
	marginBottom: "30px",
	paddingBottom: "20px",
	borderBottom: "4px solid #D87D4A",
};

const centerAlign = {
	textAlign: "center" as const,
};

const successIcon = {
	width: "64px",
	height: "64px",
	backgroundColor: "#D87D4A",
	borderRadius: "50%",
	margin: "0 auto 20px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const section = {
	margin: "30px 0",
};

const itemRow = {
	backgroundColor: "#F1F1F1",
	padding: "15px",
	marginBottom: "10px",
	borderRadius: "8px",
};


const itemDetails = {
	paddingLeft: "15px",
};

const itemQuantity = {
	textAlign: "right" as const,
};

const totalsSection = {
	backgroundColor: "#F1F1F1",
	padding: "20px",
	borderRadius: "8px",
	margin: "20px 0",
};

const totalRow = {
	margin: "10px 0",
};

const grandTotalRow = {
	borderTop: "2px solid #dddddd",
	paddingTop: "15px",
	marginTop: "15px",
};

const shippingInfo = {
	backgroundColor: "#F9F9F9",
	padding: "20px",
	borderRadius: "8px",
	borderLeft: "4px solid #D87D4A",
};

const footer = {
	textAlign: "center" as const,
	marginTop: "40px",
	paddingTop: "20px",
	borderTop: "1px solid #eeeeee",
};

// Text component styles
const logoStyle = {
	fontSize: "28px",
	fontWeight: "bold",
	color: "#000000",
	textTransform: "uppercase" as const,
	letterSpacing: "2px",
	margin: "0",
};

const h1Style = {
	color: "#000000",
	fontSize: "24px",
	margin: "20px 0 10px",
	textTransform: "uppercase" as const,
};

const orderIdStyle = {
	color: "#666666",
	fontSize: "14px",
	marginBottom: "20px",
};

const thankYouTextStyle = {
	color: "#666666",
	fontSize: "16px",
	lineHeight: "1.5",
	margin: "0",
};

const sectionTitleStyle = {
	fontSize: "18px",
	fontWeight: "bold",
	marginBottom: "15px",
	color: "#000000",
	textTransform: "uppercase" as const,
};

const itemNameStyle = {
	fontWeight: "bold",
	marginBottom: "5px",
	color: "#000000",
	margin: "0",
};

const itemPriceStyle = {
	color: "#666666",
	fontSize: "14px",
	margin: "0",
};

const itemQuantityTextStyle = {
	color: "#666666",
	fontWeight: "bold",
	margin: "0",
};

const totalLabelStyle = {
	color: "#666666",
	textTransform: "uppercase" as const,
	fontSize: "15px",
	margin: "0",
};

const totalValueStyle = {
	fontWeight: "bold",
	fontSize: "15px",
	margin: "0",
	textAlign: "right" as const,
};

const grandTotalLabelStyle = {
	color: "#000000",
	textTransform: "uppercase" as const,
	fontSize: "16px",
	fontWeight: "bold",
	margin: "0",
};

const grandTotalValueStyle = {
	color: "#D87D4A",
	fontSize: "18px",
	fontWeight: "bold",
	margin: "0",
	textAlign: "right" as const,
};

const shippingTextStyle = {
	margin: "5px 0",
	color: "#666666",
};

const buttonStyle = {
	display: "inline-block",
	backgroundColor: "#D87D4A",
	color: "#ffffff",
	padding: "15px 40px",
	textDecoration: "none",
	borderRadius: "4px",
	fontWeight: "bold",
	textTransform: "uppercase" as const,
	letterSpacing: "1px",
	margin: "20px 0",
};

const footerTextStyle = {
	color: "#666666",
	fontSize: "14px",
	lineHeight: "1.5",
	margin: "5px 0",
};

const linkStyle = {
	color: "#D87D4A",
	textDecoration: "underline",
};

const copyrightStyle = {
	color: "#666666",
	fontSize: "12px",
	marginTop: "20px",
};

export default OrderConfirmationEmail;
