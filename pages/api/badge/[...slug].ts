// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ExtensionResults } from "@/models/ExtensionResults";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeBadge } from "badge-maker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  // http://localhost:3000/api/extension?extId=eliostruyf.vscode-front-matter
  const { label, color, slug, style } = req.query;

  if (!slug || slug.length < 2) {
    return res.status(400).send("Please provide the right badge path.");
  }

  const type = slug[0];
  const extId = slug[1];

  if (!extId) {
    return res.status(400).send("Please provide an extension id.");
  }

  const vscodeData = await fetch(
    "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json;api-version=7.1-preview.1;excludeUrls=true",
      },
      body: JSON.stringify({
        assetTypes: null,
        filters: [
          {
            criteria: [
              {
                filterType: 8,
                value: "Microsoft.VisualStudio.Code",
              },
              {
                filterType: 7,
                value: extId,
              },
            ],
            direction: 1,
            pageSize: 1,
            pageNumber: 1,
            sortBy: 0,
            sortOrder: 0,
            pagingToken: null,
          },
        ],
        flags: 870,
      }),
    }
  );

  if (!vscodeData.ok) {
    return res.status(500).send("Internal Server Error.");
  }

  const data: ExtensionResults = await vscodeData.json();

  if (!data || !data.results) {
    return res.status(500).send("Internal Server Error.");
  }

  // Find the extension with the right id
  const extensions = data.results.find((r) => {
    return r.extensions.find(
      (e) => `${e.publisher.publisherName}.${e.extensionName}` === extId
    );
  });

  if (!extensions) {
    return res.status(500).send("Internal Server Error.");
  }

  const extension = extensions.extensions.find(
    (e) => `${e.publisher.publisherName}.${e.extensionName}` === extId
  );

  if (!extension) {
    return res.status(500).send("Internal Server Error.");
  }

  let badge = null;
  const badgeType = type || "version";

  const options: any = {
    style: (style as string) || "flat",
    color: (color as string) || "green",
  };

  if (badgeType === "rating") {
    const ratings = extension.statistics.find(
      (s) => s.statisticName === "averagerating"
    );

    const ratingsCount = extension.statistics.find(
      (s) => s.statisticName === "ratingcount"
    );

    if (ratings) {
      badge = makeBadge({
        ...options,
        label: (label as string) || "rating",
        message: `${ratings.value.toString()}${
          ratingsCount && ratingsCount.value > 1
            ? ` (${ratingsCount.value.toString()} ratings)`
            : ""
        }`,
      });
    }
  } else if (badgeType === "installs") {
    const installs = extension.statistics.find(
      (s) => s.statisticName === "install"
    );

    if (installs) {
      badge = makeBadge({
        ...options,
        label: (label as string) || "installs",
        message: installs.value.toString(),
      });
    }
  } else if (badgeType === "version") {
    badge = makeBadge({
      ...options,
      label: (label as string) || "version",
      message: extension.versions[0].version,
    });
  }

  if (!badge) {
    return res.status(400).send(`Something was wrong in your request`);
  }

  res.status(200).setHeader("Content-Type", "image/svg+xml").send(badge);
}
