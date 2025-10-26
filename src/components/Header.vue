<script setup>
import { useAuthStore } from '@/utils/useAuth'
import SignoutModal from '@/views/auth/SignoutModal.vue'
import { Menu, Ticket } from 'lucide-vue-next'
import { ref } from 'vue';

const auth = useAuthStore();
const isOpen  = ref(false)
const isMenuOpen  = ref(false)

</script>

<template>
      <SignoutModal v-model:isOpen="isOpen" />

    <header className="bg-white shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <RouterLink to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Ticket className="w-6 h-6 text-blue-600" />
            <span>TicketFlow</span>
          </RouterLink>

              <nav className="hidden sm:flex items-center gap-6" v-if="auth.user && auth.isAuthenticated">
                <RouterLink to="/dashboard" className="inline-block text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </RouterLink>
                <RouterLink to="/dashboard/tickets" className="inline-block text-gray-700 hover:text-gray-900 font-medium">
                  Tickets
                </RouterLink>
                <button
                  @click="isOpen = true"
                  className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </nav>

              <nav className="hidden sm:flex items-center gap-6" v-else>
                <RouterLink to="/signin" className="inline-block text-gray-700 hover:text-gray-900 font-medium">
                  Login
                </RouterLink>
                <RouterLink
                  to="/signup"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Started
                </RouterLink>
              </nav>

          <!-- {/* MOBILE HEADER */}
          {/* Mobile hamburger */} -->
            <div className="sm:hidden relative flex items-center">
              <button
                @click="isMenuOpen = !isMenuOpen"
                className="text-gray-700 text-2xl focus:outline-none"
              >
              <Menu />
              </button>
            </div>

        <!-- {/* Mobile nav dropdown */} /-->
          <div v-if="isMenuOpen" className="sm:hidden absolute right-2 top-12 bg-white border-t border-gray-200 shadow-md rounded-xl">
                <nav v-if="auth.user && auth.isAuthenticated" className="flex flex-col gap-4 p-4">
                  <RouterLink
                    to="/dashboard"
                    className="inline-block text-gray-700 hover:text-gray-900 font-medium"
                    @click="isMenuOpen = false"
                  >
                    Dashboard
                  </RouterLink>
                  <RouterLink
                    to="/dashboard/tickets"
                    className="inline-block text-gray-700 hover:text-gray-900 font-medium"
                    @click="isMenuOpen = false"
                  >
                    Tickets
                  </RouterLink>
                  <button
                    @click="isOpen = true"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </nav>

                <nav className="flex flex-col gap-4 p-4" v-else>
                  <RouterLink
                    to="/signin"
                    className="inline-block text-gray-700 hover:text-gray-900 font-medium"
                    @click="isMenuOpen = false"
                  >
                    Login
                  </RouterLink>
                  <RouterLink
                    to="/signup"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    @click="isMenuOpen = false"
                  >
                    Get Started
                  </RouterLink>
                </nav>
          </div>

        </div>
      </div>
    </header>

</template>