# 3FS Official Client Website — Final Client/Public Trial

This package is the **new public/client website**, separate from the existing private 3FS Team Website.

## Design
- 20 numbered sections matching the approved 3FS client-website concept.
- Uses the supplied Ganesha/3FS logo image in `assets/3fs-ganesha-logo.jpg`.
- Dark navy + purple + pink + cyan creative visual style.
- Basic and Standard pricing; no Premium/high-price plan.
- Camera-shooting service is excluded.
- Responsive for phone, tablet and desktop.
- No external libraries required; fast static files.

## Important
The enquiry form and payment button in this trial use browser local storage only. They do **not** send data to a live database or charge real money yet.

For production:
1. Connect a Firebase project for enquiries/calendar/status.
2. Add Firebase Authentication for the private team website.
3. Connect a real payment gateway and verify payments server-side/webhook.
4. Connect the public client site to the safe parts of the shared database.
5. Never expose Firebase service-account credentials in this website.
6. Replace `YOUR-DOMAIN.example` in `index.html` with the final domain.
7. Publish using your chosen hosting provider and then connect the Cloudflare domain.

## GitHub trial
This package can be uploaded to a separate GitHub repository such as `3fs-client-website` for testing. It must not replace the files of the private team website.

## Suggested final data flow
Client website -> secure API/Firebase -> enquiry/calendar/payment verification -> private 3FS team website.
