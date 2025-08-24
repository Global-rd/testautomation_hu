export class AdBlockerService{

    constructor(private page: any) {
    }

    public async blockAds(): Promise<any> {
        await this.page.route('**/*', (route: any) => {
            // A list of common ad domains
            const adDomains = ['doubleclick.net', 'googlesyndication.com', 'adservice.google.com'];
            const url = route.request().url();

            // Abort the request if the URL contains a known ad domain
            if (adDomains.some(domain => url.includes(domain))) {
                console.log(`Blocking ad request: ${url}`);
                route.abort();
            } else {
                route.continue();
            }
        });
    }
}