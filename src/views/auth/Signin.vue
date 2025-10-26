<script setup>
import { useAuthStore } from '@/utils/useAuth';
import { AlertCircle, Lock, Mail, Ticket } from 'lucide-vue-next';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

const {signIn, loading} = useAuthStore()

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
});

const onSubmit = async (data)=>{
try {
    await signIn(data.email, data.password);
    console.log('this is done successfully');
    
    } catch (err) {
    console.error(err);
    }
}

</script>

<template>
<div class="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-12">
        <div class="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

        <div class="relative bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <div class="flex justify-center mb-8">
            <div class="bg-blue-100 p-4 rounded-full">
            <Ticket class="w-12 h-12 text-blue-600" />
            </div>
        </div>

        <h1 class="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-center text-gray-600 mb-8">Sign in to your account to continue</p>

            <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
                <Field name="email" type="email" v-slot="{ field, meta }">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                        </label>
                        <div class="relative">
                        <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    
                        <input
                            id="email"
                            type="email"
                            v-bind="field"
                            :class="[
                            'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                            meta?.touched && !meta.valid ? 'border-red-500' : 'border-gray-300'
                            ]"
                            placeholder="you@example.com"
                            :aria-invalid="!meta.valid && meta.touched"
                            :aria-describedby="!meta.valid && meta.touched ? 'email-error' : undefined"
                        />
                        </div>
                        <div v-if="!meta.valid && meta.touched" class="flex items-center gap-1 mt-2 text-red-600 text-sm" id="email-error" role="alert">
                            <AlertCircle class="w-4 h-4" />
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                </Field>

                <Field name="password" type="password" v-slot="{ field, meta }" >
                    <div>
                        <label htmlFor="password" class="block text-sm font-medium text-gray-700 mb-2">
                        Password
                        </label>

                        <div class="relative">
                        <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    
                        <input
                            id="password"
                            type="password"
                            v-bind="field"
                            :class="['w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all', 
                            meta?.touched && !meta.valid ? 'border-red-500' : 'border-gray-300']"
                            placeholder="Enter your password"
                            :aria-invalid="!meta.valid && meta.touched"
                            :aria-describedby="!meta.valid && meta.touched ? 'password-error' : undefined"
                        />
                        </div>
                        <div v-if="!meta.valid && meta.touched" class="flex items-center gap-1 mt-2 text-red-600 text-sm" id="password-error" role="alert">
                            <AlertCircle class="w-4 h-4" />
                            <ErrorMessage name="password" />
                        </div>
                    </div>
                </Field>

            <button 
            type="submit" 
            :disabled="loading" 
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl" >
                {{loading ? 'Signing In...' : 'Sign In'}}
            </button>
        </Form>

        <div class="mt-6 text-center">
            <p class="text-gray-600">
            Don't have an account?
            <RouterLink to="/signup" class="text-blue-600 font-semibold hover:text-blue-700">
                Sign up
            </RouterLink>
            </p>
        </div>
        </div>
</div>
</template>