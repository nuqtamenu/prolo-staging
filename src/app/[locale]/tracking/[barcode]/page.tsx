import { getTracking } from "@/lib/getTracking";
import { getLocale, getTranslations } from "next-intl/server";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { TrackingFailure } from "../../_components/components";
type PageProps = {
  params: Promise<{ barcode: string }>;
};

export default async function TrackingPage({ params }: PageProps) {
  const { barcode } = await params;
  const locale = await getLocale();
  const data = await getTracking(barcode);
  const t = await getTranslations("trackingPage");

  // In case of error or no result
  if ("error" in data) {
    return (
      <div className="prolo-container mt-[70px]">
        <TrackingFailure barcode={barcode} />
      </div>
    );
  }

  console.log("Order Status: ", data.status);
  const isCancelled = data.status === "CANCELLED";
  const isDelivered = data.status === "DELIVERED_TO_RECIPIENT";
  const isPicked = data.status === "PICKED";
  const isAr = locale === "ar";
  const dateLocale = isAr ? ar : enUS;

  const formateDate = (date: string) => {
    return format(new Date(date), "dd MMM yyyy, hh:mm a", {
      locale: dateLocale,
    });
  };

  // Formating Dates
  // const createdAt = formateDate(data?.createdDate);

  const expectedAt = data.expectedDeliveryDate ? formateDate(data.expectedDeliveryDate) : "";

  const sortedRoute = (data.deliveryRoute || []).sort(
    (a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
  );
  const statusText = isAr ? data.arStatus : data.enStatus;

  // const receiverCity = isAr
  //   ? data.destinationAddress?.arabicCityName || data.destinationAddress?.city
  //   : data.destinationAddress?.city || data.destinationAddress?.arabicCityName;

  // const receiverVillage = isAr
  //   ? data.destinationAddress?.arabicVillageName || data.destinationAddress?.village
  //   : data.destinationAddress?.village || data.destinationAddress?.arabicVillageName;

  // const receiverLocation = [receiverCity, receiverVillage].filter(Boolean).join(", ");

  const timelineBorders = isAr
    ? "border-t-0 border-r border-dashed md:border-t md:border-r-0"
    : "border-t-0 border-l border-dashed md:border-t md:border-l-0";
  const timelineLength = sortedRoute.length;

  return (
    <div className="mt-[65px]">
      {/* Tracking Result Section */}
      <section>
        <div className="prolo-container">
          {/* Package Status */}
          <div
            className={`${isCancelled ? "bg-red-400" : "bg-base1"} relative w-full rounded-2xl p-6`}
          >
            <h3 className="absolute top-3 left-3 text-sm font-medium sm:top-6 sm:left-6 sm:text-lg">
              {t("orderStatus")}
            </h3>
            <div className="mt-4 w-full">
              <h4
                className={`${!isCancelled && "text-green-600"} text-center text-3xl font-bold sm:text-5xl`}
              >
                {statusText}
              </h4>
              {expectedAt && !isCancelled && !isDelivered && !isPicked && (
                <p className="mt-2 flex items-center justify-center gap-2 text-center text-xs sm:text-sm">
                  <span className="inline-block font-medium">{t("expected")} :</span>
                  <span className="inline-block">{expectedAt}</span>
                </p>
              )}
            </div>
          </div>

          {/* Sender & Receiver */}
          {/* <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-base1 rounded-2xl p-6">
              <h3 className="text-lg font-medium">{t("sender")}</h3>
              <p className="mt-4">{data?.senderFirstName}</p>
              <p className="text-sm">📞 {data?.senderPhone}</p>
            </div>
            <div className="bg-base1 rounded-2xl p-6">
              <h3 className="text-lg font-medium">{t("receiver")}</h3>
              <p className="mt-4">{data?.receiverFirstName}</p>
              <p className="text-sm">📍 {receiverLocation}</p>
              <p className="text-sm"> 📞 {data?.receiverPhone}</p>
            </div>
          </div> */}

          {/* Cash On Delivery */}
          {/* <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-base1 rounded-2xl p-6">
              <h3 className="text-lg font-medium">{t("cod")}</h3>
              <h4 className="mt-4 text-3xl font-bold">{data?.cod} SAR</h4>
              <div className="mt-2">
                <h5 className="text-base font-medium">{t("description")}</h5>
                <p className="text-base/tight">{data.description}</p>
              </div>
            </div>
          </div> */}

          {/* Note */}
          {data?.notes && (
            <div className="mt-6 rounded-md bg-yellow-200 p-2">
              <p className="italic">
                <span className="font-medium">{t("note")} :</span> {data?.notes}
              </p>
            </div>
          )}

          {/* Timeline */}
          <div className="mt-6">
            <h3 className="text-lg font-medium">{t("timeline")}</h3>
            {/*  */}
            <ul className="timeline mt-10 flex flex-col p-6 md:flex-row">
              {sortedRoute.map((route, ind) => {
                const deliveryDate = formateDate(route?.deliveryDate);
                const text = isAr ? route.arabicName : route.name;

                return (
                  <li
                    key={ind}
                    className={`relative h-[100px] px-8 md:px-0 ${isAr ? "before:right-0 before:translate-x-full before:translate-y-[50%] md:before:translate-x-[50%] md:before:translate-y-[0%]" : ""} md:h-fit md:min-w-[250px] md:pt-8 md:pl-0 ${ind !== timelineLength - 1 && timelineBorders}`}
                  >
                    <h4 className="font-medium">{text}</h4>
                    <p className="text-sm text-gray-400">{deliveryDate}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <hr className="my-5 border-gray-300" /> */}

          {/* Footer */}
          {/* <div className="text-center text-sm text-gray-600">
            {t("poweredBy")} : <strong>{data.businessSenderName || "شركة لوجستكس"}</strong>
          </div> */}
        </div>
      </section>
    </div>
  );
}
