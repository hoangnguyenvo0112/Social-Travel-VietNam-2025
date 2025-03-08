import { useStore } from "@/stores";
import { formatMoneyVND } from "@/utils/string";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./Invoice.css";
const Invoice = ({ invoice }) => {
  const { userStore } = useStore();
  const [qrImage, setQrImage] = useState("");
  useEffect(() => {
    QRCode.toDataURL(
      JSON.stringify({
        orderId: invoice.orderId,
        packageName: invoice.package.title,
        companyName: userStore.userDetail.companyName,
        price: invoice.package.price,
      })
    ).then((url) => {
      setQrImage(url);
    });
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getDate = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${date}/${month}/${year}`;
  };
  return (
    <div ref={componentRef} className="invoice-container">
      <div className="invoice-header">
        <h3>HOÁ ĐƠN THANH TOÁN</h3>
        <h4>Mã hoá đơn: {invoice.orderId}</h4>
        <p>Ngày lập hoá đơn: {getDate()}</p>
      </div>
      <div className="invoice-info">
        <div className="invoice-info-row">
          <h3>Mạng xã hội Travel Bee</h3>
          <p>Đường Vành Đai, Kí túc xá Đại học quốc gia khu B</p>
          <p>Phường Đông Hoà, thị xã Dĩ An, tỉnh Bình Dương</p>
        </div>
        <div className="invoice-info-right">
          <div className="invoice-qrcode">
            <img src={qrImage} alt="" />
          </div>
          <div className="invoice-info-p">
            <p>Khách hàng: {userStore.userDetail.companyName}</p>
            <p>Email: {userStore.user.email} </p>
          </div>
        </div>
      </div>
      <div class="invoice-table-bill-container">
        <table id="invoice-table">
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Tên dịch vụ</th>
              <th>Mô tả</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <td>1</td>
            <td>{invoice?.package.title}</td>
            <td>{invoice?.package.description}</td>
            <td>1</td>
            <td>{formatMoneyVND(invoice.package.price)}</td>
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div className="table-footer-left">
          <p>
            Cảm ơn quý khách đã sử dụng dịch vụ tại <b>Travel Bee.</b>
          </p>
        </div>
        <div className="table-footer-right">
          <b>Tổng tiền: {formatMoneyVND(invoice.package.price)}</b>
        </div>
      </div>
      <div className="invoice-confirm-row">
        <button
          onClick={() => handlePrint()}
          className="invoice-confirm-access"
        >
          In hóa đơn
        </button>
      </div>
    </div>
  );
};

export default Invoice;
