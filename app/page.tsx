import QRGeneratorClient from "@/components/QRGeneratorClient";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR코드 생성기 (QR Code Generator)",
  url: "https://qr.moneystom7.com",
  description: "URL과 텍스트를 QR코드로 즉시 변환하는 무료 도구",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  inLanguage: ["ko", "en"],
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <Script id="json-ld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <QRGeneratorClient />

      <section className="max-w-md mx-auto mt-16 space-y-10 text-sm text-gray-400 pb-16">
        <div>
          <h2 className="text-white text-base font-semibold mb-3">QR코드 생성기란?</h2>
          <p>
            QR코드 생성기는 URL, 전화번호, 이메일, 텍스트 등 어떤 내용이든 QR코드 이미지로
            즉시 변환하는 무료 온라인 도구입니다. 별도 설치나 회원가입 없이 바로 사용하고
            PNG 파일로 다운로드할 수 있습니다. 명함, 전단지, 포스터에 QR코드를 넣을 때 유용합니다.
          </p>
        </div>

        <div>
          <h2 className="text-white text-base font-semibold mb-3">사용 방법</h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li>URL 또는 텍스트 입력란에 원하는 내용을 입력합니다.</li>
            <li>QR 크기 슬라이더로 이미지 크기(128px~512px)를 조절합니다.</li>
            <li><strong className="text-gray-300">QR 생성</strong> 버튼을 누르면 QR코드가 즉시 생성됩니다.</li>
            <li><strong className="text-gray-300">PNG 다운로드</strong> 버튼으로 이미지를 저장합니다.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-white text-base font-semibold mb-3">자주 묻는 질문 (FAQ)</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-300 font-medium">QR코드에 담을 수 있는 정보 종류는?</dt>
              <dd className="mt-1">URL(웹사이트 주소), 텍스트, 전화번호, 이메일 주소, Wi-Fi 접속 정보, 명함 정보(vCard) 등 문자로 표현할 수 있는 모든 내용을 담을 수 있습니다.</dd>
            </div>
            <div>
              <dt className="text-gray-300 font-medium">생성된 QR코드는 서버에 저장되나요?</dt>
              <dd className="mt-1">아니요. 모든 처리는 브라우저 내에서만 이루어지며 서버로 데이터가 전송되지 않습니다. 개인정보가 포함된 내용도 안전하게 사용할 수 있습니다.</dd>
            </div>
            <div>
              <dt className="text-gray-300 font-medium">QR코드 크기는 어느 정도가 적당한가요?</dt>
              <dd className="mt-1">인쇄용으로는 512px 이상, 디지털 화면용으로는 256px이 일반적으로 적합합니다. 스캔 거리가 멀수록 더 큰 QR코드가 필요합니다.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
