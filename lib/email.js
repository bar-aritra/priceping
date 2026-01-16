import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendPriceDropAlert(
  userEmail,
  product,
  oldPrice,
  newPrice
) {
  try {
    const priceDrop = oldPrice - newPrice;
    const percentageDrop = ((priceDrop / oldPrice) * 100).toFixed(1);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: userEmail,
      subject: `Price Drop Alert: ${product.name}`,
      html: `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>

                <body
                    style="
                    margin: 0;
                    padding: 24px;
                    background-color: #e6f6e9;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                        'Helvetica Neue', Arial, sans-serif;
                    color: #163832;
                    "
                >
                    <!-- OUTER WRAPPER -->
                    <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="max-width: 600px; margin: 0 auto"
                    >
                    <tr>
                        <td>
                        <!-- HEADER -->
                        <div
                            style="
                            background: linear-gradient(135deg, #0f766e, #10b981);
                            padding: 32px 28px;
                            border-radius: 18px 18px 0 0;
                            text-align: center;
                            "
                        >
                            <div
                            style="
                                font-size: 42px;
                                line-height: 1;
                                margin-bottom: 10px;
                            "
                            >
                            📉
                            </div>
                            <h1
                            style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 26px;
                                font-weight: 700;
                            "
                            >
                            Price Just Dropped!
                            </h1>
                            <p
                            style="
                                margin: 10px 0 0;
                                color: #d1fae5;
                                font-size: 14px;
                            "
                            >
                            Now is the perfect time to buy
                            </p>
                        </div>

                        <!-- CARD BODY -->
                        <div
                            style="
                            background: #ffffff;
                            padding: 32px 28px;
                            border-radius: 0 0 18px 18px;
                            border: 1px solid rgba(15, 118, 110, 0.15);
                            "
                        >
                            ${
                            product.image_url
                                ? `
                            <div style="text-align: center; margin-bottom: 24px;">
                                <img
                                src="${product.image_url}"
                                alt="${product.name}"
                                style="
                                    max-width: 220px;
                                    border-radius: 14px;
                                    border: 1px solid rgba(15, 118, 110, 0.2);
                                "
                                />
                            </div>
                            `
                                : ""
                            }

                            <!-- PRODUCT NAME -->
                            <h2
                            style="
                                margin: 0 0 8px;
                                font-size: 20px;
                                font-weight: 600;
                                color: #163832;
                                text-align: center;
                            "
                            >
                            ${product.name}
                            </h2>

                            <!-- PRICE DROP BADGE -->
                            <div
                            style="
                                margin: 20px auto;
                                text-align: center;
                                display: inline-block;
                                background: #ecfdf5;
                                color: #065f46;
                                padding: 10px 18px;
                                border-radius: 999px;
                                font-size: 14px;
                                font-weight: 600;
                                border: 1px solid #a7f3d0;
                            "
                            >
                            🔥 ${percentageDrop}% cheaper than before
                            </div>

                            <!-- PRICES -->
                            <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="margin: 28px 0"
                            >
                            <tr>
                                <td
                                align="center"
                                style="
                                    padding: 14px;
                                    background: #f0fdfa;
                                    border-radius: 12px;
                                "
                                >
                                <div style="font-size: 13px; color: #6b7280">
                                    Previous Price
                                </div>
                                <div
                                    style="
                                    font-size: 18px;
                                    color: #9ca3af;
                                    text-decoration: line-through;
                                    "
                                >
                                    ${product.currency} ${oldPrice.toFixed(2)}
                                </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 22px 0">
                                <div style="font-size: 13px; color: #6b7280">
                                    Current Price
                                </div>
                                <div
                                    style="
                                    font-size: 34px;
                                    font-weight: 800;
                                    color: #0f766e;
                                    letter-spacing: -0.5px;
                                    "
                                >
                                    ${product.currency} ${newPrice.toFixed(2)}
                                </div>
                                </td>
                            </tr>

                            <tr>
                                <td
                                align="center"
                                style="
                                    padding: 16px;
                                    background: #dcfce7;
                                    border-radius: 12px;
                                "
                                >
                                <div style="font-size: 13px; color: #166534">
                                    You Save
                                </div>
                                <div
                                    style="
                                    font-size: 24px;
                                    font-weight: 700;
                                    color: #15803d;
                                    "
                                >
                                    ${product.currency} ${priceDrop.toFixed(2)}
                                </div>
                                </td>
                            </tr>
                            </table>

                            <!-- CTA -->
                            <div style="text-align: center; margin: 36px 0">
                            <a
                                href="${product.url}"
                                style="
                                display: inline-block;
                                background: linear-gradient(135deg, #0f766e, #10b981);
                                color: #ffffff;
                                padding: 16px 38px;
                                border-radius: 14px;
                                font-size: 16px;
                                font-weight: 700;
                                text-decoration: none;
                                "
                            >
                                View Product →
                            </a>
                            </div>

                            <!-- FOOTER -->
                            <div
                            style="
                                text-align: center;
                                font-size: 12px;
                                color: #6b7280;
                                border-top: 1px solid rgba(15, 118, 110, 0.15);
                                padding-top: 20px;
                                margin-top: 28px;
                            "
                            >
                            <p style="margin: 0">
                                You’re receiving this because you’re tracking this product on
                                <strong>PricePing</strong>.
                            </p>

                            <p style="margin-top: 10px">
                                <a
                                href="${process.env.NEXT_PUBLIC_APP_URL}"
                                style="
                                    color: #0f766e;
                                    text-decoration: none;
                                    font-weight: 600;
                                "
                                >
                                View all tracked products
                                </a>
                            </p>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </table>
                </body>
                </html>
`,
    });
    if (error) {
      console.error("Resend error:", error);
      return { error };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { error: error.message };
  }
}
