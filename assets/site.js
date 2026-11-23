// Tiny i18n for the website: English + Vietnamese. Text lives in the HTML
// (English) and in this dictionary (Vietnamese). No cookies, no tracking;
// the chosen language is remembered in this browser only.
(() => {
  const VI = {
    'nav.features': 'Tính năng', 'nav.trades': 'Ngành nghề', 'nav.pricing': 'Bảng giá', 'nav.verify': 'Kiểm tra ảnh', 'nav.help': 'Trợ giúp', 'nav.privacy': 'Quyền riêng tư',
    'hero.pill': 'Ảnh bằng chứng có xác minh', 'hero.title': 'Ảnh bằng chứng <em>không thể chối cãi.</em>',
    'hero.lead': 'Mỗi ảnh được đóng dấu giờ chuẩn, địa chỉ chính xác và GPS ngay trên ảnh, kèm dấu vân tay chống chỉnh sửa. Khi khách nói “chưa nhận hàng” hay “trước đó không hư”, bạn có bằng chứng.',
    'hero.play': 'Sắp có trên', 'hero.ios': 'Sắp có trên', 'hero.verify': 'Kiểm tra một ảnh',
    'trust.offline': 'Chạy không cần mạng', 'trust.account': 'Không cần tài khoản', 'trust.private': 'Ảnh không rời máy', 'trust.lang': '19 ngôn ngữ',
    'float.time': 'Giờ đã xác minh', 'float.time2': 'mạng + vệ tinh', 'float.addr': 'Số nhà ±1', 'float.addr2': 'sửa trong 1 chạm', 'float.hash': 'SHA-256', 'float.hash2': 'chống chỉnh sửa',
    'how.eyebrow': 'Cách hoạt động', 'how.title': 'Ba bước, chưa tới 3 giây', 'how.sub': 'Không menu rườm rà. Mở app là chụp, tem bạn thấy chính là tem được lưu.',
    'how.1t': 'Chọn trạng thái', 'how.1': 'Để trước cửa, Đã hoàn thành, Điểm tuần tra… theo đúng công việc của bạn.',
    'how.2t': 'Chụp hoặc giữ để quay', 'how.2': 'Giờ, địa chỉ, GPS, mã đơn, chữ ký được in thẳng lên ảnh hoặc video.',
    'how.3t': 'Gửi cho hỗ trợ', 'how.3': 'Sao chép đoạn khiếu nại soạn sẵn, chia sẻ ảnh hoặc PDF cả ca. Khách kiểm tra được trên web.',
    'feat.eyebrow': 'Tính năng', 'feat.title': 'Làm cho hiện trường, không phải studio', 'feat.sub': 'Mọi thứ một người làm nghề cần để bằng chứng đứng vững – và không có gì thừa.',
    'f1t': 'Địa chỉ chính xác, sửa được', 'f1': 'Số nhà lệch một? Bấm −1 / +1. Bản sửa gắn với điểm giao đó và tự xoá khi bạn đi tiếp.',
    'f2t': 'Giờ không thể giả', 'f2': 'Đối chiếu giờ mạng và giờ vệ tinh – đồng hồ máy sai cũng không làm hỏng bằng chứng.',
    'f3t': 'Ảnh hoặc video', 'f3': 'Giữ nút chụp để quay. Đồng hồ trên tem chạy từng giây trong video.',
    'f4t': 'Mã đơn & chữ ký', 'f4': 'Quét mã vạch/QR trên nhãn, khách ký bằng ngón tay. Cả hai in lên tem.',
    'f5t': 'Trước / sau', 'f5': 'Ảnh “trước” hiện mờ trên camera để căn góc, rồi chia sẻ ảnh ghép hai bên.',
    'f6t': 'Ai cũng kiểm tra được', 'f6': 'Khách thả file vào trang Kiểm tra ảnh: dấu vân tay, giờ, GPS – ngay trong trình duyệt.',
    'trades.eyebrow': 'Ngành nghề', 'trades.title': 'Một camera, đúng cho công việc của bạn', 'trades.sub': 'Chọn loại công việc để có bộ trạng thái và công cụ phù hợp. Đổi bất cứ lúc nào.',
    't1': 'Giao hàng', 't1s': 'Để trước cửa, giao tận tay, giao thất bại', 't2': 'Xây dựng & sửa chữa', 't2s': 'Trước khi làm, đang thi công, hoàn thành, vật tư',
    't3': 'Vệ sinh & dịch vụ', 't3s': 'Đã đến, trước/sau, bàn giao chìa khóa', 't4': 'Kiểm tra & kỹ thuật', 't4s': 'Đạt, không đạt, chỉ số đồng hồ',
    't5': 'Cho thuê & bàn giao xe', 't5s': 'Nhận, trả, hư hỏng có sẵn, số km', 't6': 'Bảo vệ & tuần tra', 't6s': 'Điểm tuần tra, bình thường, sự cố',
    't7': 'Chấm công', 't7s': 'Vào ca, tan ca kèm giờ và vị trí', 't8': 'Bảng công trình', 't8s': 'Tem dạng bảng công trình cho hồ sơ thi công',
    'shots.1': 'Công cụ một chạm', 'shots.2': '9 kiểu tem', 'shots.3': 'Chi tiết bằng chứng', 'shots.4': 'Báo cáo PDF cả ca',
    'band.title': 'Khách hàng tự kiểm tra – không cần tải ảnh lên', 'band.text': 'Trang Kiểm tra ảnh đọc dấu vân tay SHA-256, giờ và GPS trong file ngay trên máy người xem, đối chiếu với đoạn bằng chứng – và cả một file sao lưu ZIP.',
    'band.cta': 'Mở trang kiểm tra', 'band.c1': 'Khớp dấu vân tay SHA-256', 'band.c2': 'Đối chiếu ID, giờ, vị trí', 'band.c3': 'Kiểm tra cả file sao lưu ZIP', 'band.c4': 'In báo cáo kiểm tra',
    'price.eyebrow': 'Bảng giá', 'price.title': 'Miễn phí cho mỗi ca. Pro khi bạn bận.', 'price.sub': 'Bản miễn phí giữ nguyên chất lượng bằng chứng. Pro bỏ giới hạn và quảng cáo.',
    'free.title': 'Miễn phí', 'free.sub': 'Không cần đăng ký', 'free.1': '30 ảnh mỗi ngày (+10 ảnh khi xem quảng cáo ngắn)', 'free.2': 'Độ phân giải gốc, GPS, địa chỉ, xác minh giờ', 'free.3': 'Quét mã, chữ ký, trước/sau, video 15 giây', 'free.4': 'Banner nhỏ chỉ ở màn Lịch sử, không bao giờ ở camera',
    'pro.title': 'Pro', 'pro.sub': 'Gói tháng hoặc năm, giá hiển thị trong app', 'pro.badge': 'PHỔ BIẾN', 'pro.1': 'Không giới hạn ảnh, không quảng cáo', 'pro.2': 'Báo cáo PDF bất cứ lúc nào', 'pro.3': 'Video 30 giây, tên và logo trên tem', 'pro.4': 'Tem doanh nghiệp, bảng công trình, trạng thái riêng',
    'faq.title': 'Câu hỏi thường gặp', 'q1': 'App có tải ảnh của tôi lên không?', 'a1': 'Không. Ảnh, vị trí và cài đặt nằm trên điện thoại của bạn. Xem chính sách quyền riêng tư.',
    'q2': 'Không có sóng thì sao?', 'a2': 'Giờ, GPS và tem vẫn hoạt động. Địa chỉ hiện khi máy tra được; toạ độ luôn được đóng dấu.',
    'q3': 'Khách kiểm tra ảnh là thật bằng cách nào?', 'a3': 'Gửi file gốc và đoạn bằng chứng. Họ mở trang Kiểm tra ảnh, thả file vào – thấy ngay có khớp hay không, kèm giờ và GPS.',
    'q4': 'Nền tảng giao hàng có chấp nhận ảnh này không?', 'a4': 'App giúp ảnh rõ ràng và khó bị bác hơn, nhưng mỗi nền tảng tự quyết định. Hãy tuân theo quy định chụp ảnh của họ.',
    'more': 'Thêm câu trả lời và liên hệ →', 'foot.na': 'Không liên kết với nền tảng giao hàng nào.', 'foot.photos': 'Ảnh màn hình là app thật với ảnh mẫu:',
    // verify page
    'v.title': 'Kiểm tra ảnh bằng chứng', 'v.lead': 'Xác nhận ảnh hoặc video chưa bị chỉnh sửa kể từ lúc chụp, và đọc giờ, GPS lưu bên trong. Chạy hoàn toàn trên thiết bị này – không tải file lên đâu cả.',
    'v.files': 'Thả ảnh, video hoặc file sao lưu ZIP', 'v.files2': 'hoặc bấm để chọn · được chọn nhiều file · nên dùng file gốc, không dùng ảnh chụp màn hình',
    'v.text': 'Dán đoạn bằng chứng (không bắt buộc)', 'v.text2': 'Từ tin nhắn của tài xế, báo cáo PDF hoặc nút “Sao chép” trong app. Có thể dán nhiều đoạn.',
    'v.ph': 'Dán vào đây – ví dụ:\nProof ID: 7F3A29C1\nSHA-256: 3f9a…',
    'v.clear': 'Xoá', 'v.print': 'In / lưu PDF', 'v.empty': 'Kết quả sẽ hiện ở đây.', 'v.checking': 'Đang kiểm tra…',
    'v.match': 'Khớp – file chưa bị thay đổi', 'v.nomatch': 'Không khớp với đoạn bằng chứng', 'v.nohash': 'Đã tính dấu vân tay', 'v.zip': 'File sao lưu',
    'v.how': 'Cách hoạt động', 'v.how1': 'Khi lưu bằng chứng, app ghi lại dấu vân tay SHA-256 của file. Chỉ cần đổi một điểm ảnh, dấu vân tay sẽ khác hoàn toàn. Nếu dấu vân tay của file bạn có trùng với đoạn bằng chứng, file đó chính xác là file app đã lưu.',
    'v.how2': 'Các ứng dụng nhắn tin (Zalo, WhatsApp, Messenger, email “giảm dung lượng”) thường nén lại ảnh nên dấu vân tay đổi dù không ai chỉnh sửa. Khi cần khớp, hãy xin file gửi dạng tài liệu hoặc từ file PDF/ZIP xuất từ app.',
    'c.hashok': 'Dấu vân tay khớp với bằng chứng', 'c.hashbad': 'Dấu vân tay khác – file đã bị chỉnh sửa hoặc bị nén lại', 'c.nohash': 'Chưa có dấu vân tay để so – hãy dán đoạn bằng chứng hoặc thêm file sao lưu ZIP',
    'c.idok': 'Mã bằng chứng trong file khớp', 'c.idbad': 'Mã bằng chứng trong file khác', 'c.gpsok': 'GPS trong file khớp với bằng chứng', 'c.gpsbad': 'GPS trong file cách xa bằng chứng',
    'c.timeok': 'Giờ chụp trong file khớp với bằng chứng', 'c.timediff': 'Giờ chụp khác với đoạn bằng chứng', 'c.sw': 'Được tạo bằng app (có siêu dữ liệu)', 'c.swother': 'Lần lưu cuối bằng chương trình khác',
    'c.noexif': 'Không có siêu dữ liệu – ảnh có thể đã bị lưu lại hoặc gửi qua ứng dụng chat',
    'r.file': 'Tệp', 'r.taken': 'Giờ chụp', 'r.map': 'bản đồ', 'r.id': 'Mã bằng chứng', 'r.details': 'Chi tiết', 's.files': 'tệp', 's.ok': 'khớp', 's.bad': 'không khớp',
    'h2.a': 'Ảnh bằng chứng cho', 'r1': 'giao hàng.', 'r2': 'công trình.', 'r3': 'kiểm tra.', 'r4': 'tuần tra.', 'r5': 'thuê xe.', 'r6': 'chuyến đi của bạn.',
    'hero.lead2': 'Giờ đã xác minh, địa chỉ chính xác và GPS trên mỗi ảnh – kèm dấu vân tay chống chỉnh sửa và báo cáo PDF chuyên nghiệp. Khi ai đó nói “chưa nhận hàng” hay “trước đó không hư”, bạn có bằng chứng.',
    'trust2.gps': '✓ GPS chạy không cần 3G/4G', 'trust2.account': '✓ Không cần tài khoản', 'trust2.private': '✓ Ảnh không rời máy', 'trust2.lang': '✓ 19 ngôn ngữ',
    't9': 'Bảo trì & diệt côn trùng', 't10': 'Bảo hiểm & tai nạn', 't11': 'Bán hàng & cửa hàng', 't12': 'Nông nghiệp & cây cảnh', 't13': 'Cá nhân & du lịch',
    'how2.title': 'Thiết kế như máy ảnh, không phải biểu mẫu', 'how2.sub': 'Mở app, chọn trạng thái, chụp. Mọi thứ khác chỉ cách một chạm – và chỉ hiện khi bạn cần.',
    's1t': 'Bằng chứng giao hàng một chạm', 's1': 'Trạng thái, giờ, địa chỉ chính xác và GPS in thẳng lên ảnh. Sai số nhà? Sửa bằng − / +.',
    's2t': 'Màu riêng cho từng ngành', 's2': '12 loại công việc với trạng thái và màu riêng – xanh là xong, cam là đang làm, đỏ là sự cố.',
    's3t': 'Công cụ khi cần', 's3': 'Một nút “+”: quét mã vạch, lấy chữ ký, căn ảnh trước/sau, sửa địa chỉ.',
    's4t': 'Tem của bạn, thương hiệu của bạn', 's4': '10 kiểu tem, phông chữ, màu, độ đậm nền, logo và tên của bạn (Pro).',
    's5t': 'Đẹp cho khoảnh khắc cá nhân', 's5': 'Tem Nhật ký biến chuyến đi và sự kiện thành kỷ niệm có ngày giờ, địa điểm.',
    'st1': 'loại công việc có màu riêng', 'st2': 'kiểu tem', 'st3': 'ngôn ngữ', 'st4': 'ảnh bị chúng tôi tải lên',
    'gal.eyebrow': 'Bên trong app', 'gal.title': 'Màn hình thật. Không phải ảnh dựng.',
    'g1': 'Chọn công việc', 'g1s': '12 ngành + cá nhân', 'g2': 'Chi tiết bằng chứng', 'g2s': 'Kiểm tra giờ, địa chỉ, GPS, dấu vân tay', 'g3': 'Lịch sử', 'g3s': 'Tìm, lọc, xuất báo cáo', 'g4': 'Báo cáo bằng chứng PDF', 'g4s': 'Bìa, mục lục, dấu vân tay, cam kết',
    'hn.t': 'Nói thật:', 'hn.b': 'GPS lấy từ vệ tinh nên vị trí, giờ và tem vẫn chạy khi không có 3G/4G. Địa chỉ đường, kiểm tra giờ qua mạng, quảng cáo và mua gói cần internet – khi mất mạng, tem ghi toạ độ và địa chỉ sẽ điền sau khi có mạng.',
    'free.3b': 'Mọi loại công việc, quét mã, chữ ký, trước/sau, video 15 giây', 'free.5': 'Tem Cổ điển, Đồng hồ lớn, Tối giản và Nhật ký',
    'pro.2b': 'Báo cáo PDF bất cứ lúc nào, có tên công ty trên bìa', 'pro.4b': '6 kiểu tem thiết kế, phông chữ, thêm màu, độ đậm nền', 'pro.5': 'Trạng thái tuỳ chỉnh', 'price.sub2': 'Chụp miễn phí thoải mái. Pro thêm ảnh 4K, báo cáo và thương hiệu của bạn, không quảng cáo.', 'free.1b': 'Chụp không giới hạn, chất lượng Full HD', 'free.2b': 'GPS, địa chỉ, xác minh giờ, dấu vân tay SHA-256', 'free.6': 'Báo cáo PDF: xem một quảng cáo ngắn mỗi khi cần', 'pro.1b': 'Ảnh 4K, không quảng cáo',
    'q2b': 'Không có 3G/4G có dùng được không?', 'a2b': 'GPS, giờ và tem vẫn chạy vì GPS dùng vệ tinh. Địa chỉ đường và kiểm tra giờ qua mạng cần internet; khi mất mạng, toạ độ vẫn được đóng dấu và địa chỉ hiện khi có kết nối.',
    'q5': 'Báo cáo PDF có giá trị pháp lý không?', 'a5': 'Đây là bằng chứng hỗ trợ mạnh – mỗi ảnh có dấu vân tay ai cũng kiểm tra được, và bạn có thể ký trang cam kết – nhưng không app nào tự làm một tài liệu có giá trị pháp lý ràng buộc. Hãy hỏi nền tảng, công ty bảo hiểm hoặc toà án họ chấp nhận gì.',
    'nav.terms': 'Điều khoản',
  };
  const KEY = 'site-lang';
  let lang = 'en';
  try { lang = localStorage.getItem(KEY) || ((navigator.language || '').toLowerCase().startsWith('vi') ? 'vi' : 'en'); } catch (_) {}

  const originals = new Map();
  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      el.innerHTML = lang === 'vi' && VI[k] != null ? VI[k] : originals.get(el);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const k = el.getAttribute('data-i18n-ph');
      if (!el.dataset.phEn) el.dataset.phEn = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', lang === 'vi' && VI[k] ? VI[k] : el.dataset.phEn);
    });
    document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }
  window.siteLang = () => lang;
  window.siteT = (k, en) => (lang === 'vi' && VI[k]) || en;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => {
      lang = b.dataset.lang;
      try { localStorage.setItem(KEY, lang); } catch (_) {}
      apply();
    }));
    apply();
  });
})();
