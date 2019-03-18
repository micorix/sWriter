export const getThemes = (query) => new Promise((resolve, reject) => {
    fetch("https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery", {
        method: "POST",
        mode: "cors",
        headers: {
            "accept": "application/json;api-version=5.1-preview.1;excludeUrls=true",
            "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
        },
        body: JSON.stringify({
            assetTypes: [
                "Microsoft.VisualStudio.Services.Icons.Default",
                "Microsoft.VisualStudio.Services.Icons.Branding",
                "Microsoft.VisualStudio.Services.Icons.Small"
            ],
            filters: [{
                criteria: [{
                        filterType: 8,
                        value: "Microsoft.VisualStudio.Code"
                    },
                    {
                        filterType: 10,
                        value: query ? query : 'target:\"Microsoft.VisualStudio.Code\" '
                    },
                    {
                        filterType: 12,
                        value: "37888"
                    },
                    {
                        filterType: 5,
                        value: "Themes"
                    }
                ],
                direction: 2,
                pageSize: 54,
                pageNumber: 1,
                sortBy: 4,
                sortOrder: 0,
                pagingToken: null
            }],
            flags: 870
        })
    }).then(r => r.json()).then(result => resolve(result.results[0].extensions))
})