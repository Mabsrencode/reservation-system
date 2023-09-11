import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
function Home() {
  return (
    <main>
      {/* hero */}
      <section>
        <div className="my-9 relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
          <div className=" inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
            <svg
              className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
              viewBox="0 0 100 100"
              fill="currentColor"
              preserveAspectRatio="none slice"
            >
              <path d="M50 0H100L50 100H0L50 0Z" />
            </svg>
            <img
              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
              src="https://the-riotact.com/wp-content/uploads/2019/01/carwash-service-worker-soaps-glasses-2021-08-26-16-26-42-utc-1200x801.jpg"
              alt=""
            />
          </div>
          <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
            <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
              <p className="inline-block  py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Clean your car now!
              </p>
              <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Everything you
                <br className="hidden md:block" />
                can imagine{" "}
                <span className="inline-block text-deep-purple-accent-400">
                  is real
                </span>
              </h2>
              <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae. explicabo.
              </p>
              <div className="flex items-center">
                <Button className="mr-4 py-2">
                  <Link
                    to="/"
                    // className="inline-flex items-center justify-center h-9 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#1a1919] hover:bg-black focus:shadow-outline focus:outline-none"
                  >
                    Sign Up
                  </Link>
                </Button>
                <Link
                  to="/about"
                  aria-label=""
                  className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonials/feedback */}
      <section>
        <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
          <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center max-w-xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                  What people <br />
                  are saying.
                </h1>
                <h3 className="text-xl mb-5 font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
                <div className="text-center mb-10">
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                </div>
              </div>
              <div className="-mx-3 md:flex items-start">
                <div className="px-3 md:w-1/3">
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=1" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          Kenzie Edgar.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos sunt ratione dolor exercitationem minima quas
                        itaque saepe quasi architecto vel! Accusantium, vero
                        sint recusandae cum tempora nemo commodi soluta
                        deleniti.
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=2" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          Stevie Tifft.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum, dolor sit amet, consectetur adipisicing
                        elit. Dolore quod necessitatibus, labore sapiente, est,
                        dignissimos ullam error ipsam sint quam tempora vel.
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-3 md:w-1/3">
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=3" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          Tommie Ewart.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vitae, obcaecati ullam excepturi dicta error
                        deleniti sequi.
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=4" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          Charlie Howse.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Architecto inventore voluptatum nostrum atque, corrupti,
                        vitae esse id accusamus dignissimos neque reprehenderit
                        natus, hic sequi itaque dicta nisi voluptatem! Culpa,
                        iusto.
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-3 md:w-1/3">
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=5" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          Nevada Herbertson.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis, voluptatem porro obcaecati dicta, quibusdam sunt
                        ipsum, laboriosam nostrum facere exercitationem pariatur
                        deserunt tempora molestiae assumenda nesciunt alias
                        eius? Illo, autem!
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=6" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          Kris Stanton.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatem iusto, explicabo, cupiditate quas totam!
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* map */}
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q={15.083239169793757},{120.63592799664632}&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Feedback
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Leave a comment below how our services great.
            </p>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Button
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Thank you for using our service.
            </p>
          </div>
        </div>
      </section>
      {/* accordion */}
      <section>
        <div class="h-screen  to-indigo-100 grid place-items-center">
          <div class="w-6/12 mx-auto rounded border">
            <div class="bg-white p-10 shadow-sm">
              <h3 class="text-lg font-medium text-gray-800">
                Several Windows stacked on each other
              </h3>
              <p class="text-sm font-light text-gray-600 my-3">
                The accordion is a graphical control element comprising a
                vertically stacked list of items such as labels or thumbnails
              </p>

              <div class="h-1 w-full mx-auto border-b my-5"></div>

              <div class="transition hover:bg-indigo-50">
                <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i class="fas fa-plus"></i>
                  <h3>What is term?</h3>
                </div>

                <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p class="leading-6 font-light pl-9 text-justify">
                    Our asked sex point her she seems. New plenty she horses
                    parish design you. Stuff sight equal of my woody. Him
                    children bringing goodness suitable she entirely put far
                    daughter.
                  </p>
                  <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">
                    Learn more
                  </button>
                </div>
              </div>

              <div class="transition hover:bg-indigo-50">
                <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i class="fas fa-plus"></i>
                  <h3>When to use Accordion Components?</h3>
                </div>

                <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p class="leading-6 font-light pl-9 text-justify">
                    Our asked sex point her she seems. New plenty she horses
                    parish design you. Stuff sight equal of my woody. Him
                    children bringing goodness suitable she entirely put far
                    daughter.
                  </p>
                  <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">
                    Learn more
                  </button>
                </div>
              </div>

              <div class="transition hover:bg-indigo-50">
                <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i class="fas fa-plus"></i>
                  <h3>How can it be defined?</h3>
                </div>

                <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p class="leading-6 font-light pl-9 text-justify">
                    Our asked sex point her she seems. New plenty she horses
                    parish design you. Stuff sight equal of my woody. Him
                    children bringing goodness suitable she entirely put far
                    daughter.
                  </p>
                  <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">
                    Learn more
                  </button>
                </div>
              </div>

              <div class="transition hover:bg-indigo-50">
                <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                  <i class="fas fa-plus"></i>
                  <h3>Chamber reached do he nothing be?</h3>
                </div>

                <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
                  <p class="leading-6 font-light pl-9 text-justify">
                    Our asked sex point her she seems. New plenty she horses
                    parish design you. Stuff sight equal of my woody. Him
                    children bringing goodness suitable she entirely put far
                    daughter.
                  </p>
                  <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
