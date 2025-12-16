export default function ContactSectionForm() {
    return (
        <div className="py-12 px-6">
            <div className="d-f fw-w g-12">
                <div className="f-1 min-w-64">
                    <h2 className="ff-s fs-3xl fw-600 tc-slate-10 mb-2">Contact us</h2>
                    <p className="fs-md tc-silver-10 mb-6 m-0">We'd love to hear from you. Reach out anytime.</p>
                    <div className="d-f fd-c g-4">
                        <div className="d-f ai-c g-3">
                            <div className="d-f ai-c jc-c d-10 rad-9 b-1 bc-silver-4 tc-slate-9">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </div>
                            <div>
                                <p className="fs-sm fw-600 tc-slate-9 m-0">Live Chat</p>
                                <p className="fs-sm tc-silver-10 m-0">Chat with us in real-time</p>
                            </div>
                        </div>
                        <div className="d-f ai-c g-3">
                            <div className="d-f ai-c jc-c d-10 rad-9 b-1 bc-silver-4 tc-slate-9">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div>
                                <p className="fs-sm fw-600 tc-slate-9 m-0">Phone</p>
                                <p className="fs-sm tc-silver-10 m-0">+1 (555) 000-0000</p>
                            </div>
                        </div>
                        <div className="d-f ai-c g-3">
                            <div className="d-f ai-c jc-c d-10 rad-9 b-1 bc-silver-4 tc-slate-9">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <p className="fs-sm fw-600 tc-slate-9 m-0">Address</p>
                                <p className="fs-sm tc-silver-10 m-0">123 Main St, City, Country</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="f-1 min-w-64">
                    <form className="d-f fd-c g-4">
                        <div className="d-f fd-c g-1">
                            <label htmlFor="name" className="fs-sm fw-600 tc-slate-9">Name</label>
                            <input id="name" type="text" placeholder="Your name" className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2" />
                        </div>
                        <div className="d-f fd-c g-1">
                            <label htmlFor="email" className="fs-sm fw-600 tc-slate-9">Email</label>
                            <input id="email" type="email" placeholder="you@example.com" className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2" />
                        </div>
                        <div className="d-f fd-c g-1">
                            <label htmlFor="message" className="fs-sm fw-600 tc-slate-9">Message</label>
                            <textarea
                                id="message"
                                placeholder="Your message"
                                rows={4}
                                className="w-full px-3 py-2 b-1 bc-silver-4 rad-0 fs-sm tc-black f:oc-silver-1 f:os-s f:ow-2 rz-n"
                            ></textarea>
                        </div>
                        <button type="submit" className="px-4 py-2 rad-0 fs-sm fw-600 bg-slate-8 tc-white h:bg-slate-10 f:oc-silver-4 f:os-s f:ow-2">
                            Send message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
