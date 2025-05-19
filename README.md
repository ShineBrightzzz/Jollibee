# Trang Web Đặt Món Jollibee

Ứng dụng web responsive cho nhà hàng Jollibee cho phép khách hàng duyệt các món ăn, thêm vào giỏ hàng, điều chỉnh số lượng và hoàn tất thanh toán với hệ thống mã QR.

## Tính năng

- Thiết kế responsive hoạt động trên các thiết bị di động và máy tính
- Menu tương tác với các món ăn và mô tả
- Chức năng giỏ hàng cho phép:
  - Thêm món vào giỏ hàng
  - Điều chỉnh số lượng
  - Xóa món ăn
- Trang tổng kết đơn hàng với:
  - Chi tiết từng món
  - Tính toán giá (tạm tính, thuế, tổng cộng)
  - Mã QR cho thanh toán
  - Tạo mã đơn hàng

## Triển khai kỹ thuật

Trang web được xây dựng bằng:
- HTML5
- CSS3 với nguyên tắc thiết kế responsive
- JavaScript thuần (không dùng framework)
- QRCode.js để tạo mã QR thanh toán

## Cách sử dụng

1. Mở `index.html` trong trình duyệt web
2. Duyệt menu và nhấp "Thêm vào giỏ" trên các món ăn mong muốn
3. Điều chỉnh số lượng hoặc xóa món trong phần giỏ hàng
4. Nhấp "Thanh toán" để chuyển đến trang đơn hàng
5. Quét mã QR để hoàn tất thanh toán
6. In hóa đơn nếu cần

## Cấu trúc

- `index.html` - Trang chính với menu và giỏ hàng
- `styles.css` - Stylesheet chính cho trang web
- `script.js` - JavaScript cho chức năng trang chính
- `order.html` - Trang đơn hàng/thanh toán
- `order.css` - Style dành riêng cho trang đơn hàng
- `order.js` - JavaScript cho chức năng trang đơn hàng
- `images/` - Thư mục chứa hình ảnh sản phẩm và logo

## Cải tiến tương lai

Các tính năng tiềm năng cho phiên bản tương lai:
- Tài khoản người dùng và lịch sử đơn hàng
- Nhập địa chỉ để giao hàng
- Ước tính thời gian giao hàng
- Tích hợp với các cổng thanh toán thực tế
- Hiệu ứng và chuyển tiếp để trải nghiệm người dùng tốt hơn

## Ghi công

- Hình minh họa SVG được tạo cho mục đích trình diễn
- Jollibee là thương hiệu đã đăng ký của Jollibee Foods Corporation
