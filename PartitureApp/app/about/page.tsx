import { UniversalHeader } from "@/components/universal-header"
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <UniversalHeader 
        position="sticky"
        showLogo={true}
        navigationItems={[
          { label: "Explore", href: "/explore" },
          { label: "Playlist", href: "/playlist" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/profile" },
          { label: "Settings", href: "/settings" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
              Partiture
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing music creation by transforming audio into beautiful sheet music with the power of AI
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Partiture, we believe that music should be accessible to everyone. Whether you're a seasoned
                composer, a music student, or someone who just hummed a melody, our AI-powered platform transforms your
                musical ideas into professional sheet music.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We're democratizing music notation, making it possible for anyone to create, share, and discover
                beautiful musical compositions with just a few clicks.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Sheet Music Generated</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎤</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Conversion</h3>
            <p className="text-gray-600">
              Upload any audio file and watch our AI transform it into accurate, professional sheet music
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎹</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Playback</h3>
            <p className="text-gray-600">
              Play your sheet music with our virtual piano and hear your compositions come to life
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Community</h3>
            <p className="text-gray-600">
              Share your creations and discover amazing compositions from musicians worldwide
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6">
              Partiture was born from a simple frustration: the gap between musical inspiration and notation. Our
              founders, a team of musicians and technologists, experienced firsthand how difficult it could be to
              capture fleeting musical ideas in traditional sheet music format.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Combining cutting-edge AI technology with deep musical knowledge, we created a platform that understands
              music the way humans do. From a hummed melody to a full orchestral recording, Partiture can analyze,
              interpret, and beautifully notate any musical content.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to serve thousands of musicians, educators, and music lovers worldwide, helping them
              bring their musical visions to life with unprecedented ease and accuracy.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create?</h2>
          <p className="text-gray-600 mb-8">Join thousands of musicians already using Partiture</p>
          <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Start Creating Music
          </button>
        </div>
      </div>
    </div>
  )
}
