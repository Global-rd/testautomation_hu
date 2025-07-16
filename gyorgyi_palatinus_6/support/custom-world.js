const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld extends World {
    constructor(options) {
        super(options);
        this.attach = options.attach;
        this.parameters = options.parameters;
        
        this.browser = null;
        this.context = null;
        this.page = null;
    }
    async initBrowserSession () {
        this.browser = await chromium.launch({ headless:false});
        this.context = await this.browser.newContext({
            recordVideo: {
                dir: 'videos/',
      },
    });
        this.page = await this.context.newPage();
    }
    async closeBrowserSession() {

        if (this.page) {
            const video = this.page.video();
            await this.page.close();
            if (video) {
                const videoPath = await video.path();
                console.log(`🎥 Video saved to ${videoPath}`);
            }
        }
        await this.context?.close();
        await this.browser?.close();
        
        
    }
   
}
setWorldConstructor(CustomWorld);