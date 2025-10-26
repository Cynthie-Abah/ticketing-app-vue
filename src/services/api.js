import { supabase } from "@/utils/supabase";

// GOOGLE LOGIN
export const userGoogleLogin = async () => {
try {
    let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'Google',
    options: {
    redirectTo: `${window.location.origin}/dashboard`,
},
    })

    if (error) {
    console.error("Login failed:", error.message);
    throw error;
    }

    // Successful login
    return { user: data.user, session: data.session };
} catch (err) {
    console.error("Unexpected error:", err);
    throw  err ;
}
};
// EMAIL LOGIN
export const userEmailLogin = async (email, password) => {
try {
    const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    });

    if (error) {
    console.error("Login failed:", error.message || "Login failed");
    throw new Error(error.message);
    }

    // Successful login
    return { user: data.user, session: data.session };
} catch (err) {
    console.error("Unexpected error:", err.message);
    throw err;
}
};
// EMAIL SIGNUP 
export const userSignUp = async (email, password) => {
try {
    let { data, error } = await supabase.auth.signUp({
    email,
    password
    })

    if (error) {
    console.error("Login failed:", error.message || "Login failed");
    throw new Error(error.message);
    }

    // Successful login
    return { user: data.user, session: data.session };
} catch (err) {
    console.error("Unexpected error:", err.message);
    throw err;
}
};
// READ TICKETS FOR USER
export const getTickets = async ()=> {
    try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('User not logged in')

    const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
    if(error) throw new Error(error.message)
        
    return data;
    } catch (error) {
        throw new Error(error.message)
    }
}
// GET TICKET BY ID
export async function getTicketbyId(id) {
try {
    let query = supabase
    .from('tickets')
    .select('*')
    .eq('id', id)
    .single();

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;

} catch (error) {
    console.error('Error fetching ticket:', error.message);
    throw new Error('Failed to fetch ticket. Please try again.');
}
}
// CREATE TICKETS FOR USER 
export const createTicket = async (data)=> {    
    try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('User not logged in')

    console.log(user);
    

    const { error } = await supabase
    .from('tickets')
    .insert([
        { ...data, user_id: user.id },
    ])
    .select()

    if(error) throw new Error(error.message)
        
    return data;
    } catch (error) {
        throw new Error(error.message)
    }
}
//  UPDATE TICKET FOR USER
export const editTicket = async (formData, id)=> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('User not logged in')

    try {
    const { data, error } = await supabase
    .from('tickets')
    .update({...formData})
    .eq("id", id)
    .eq('user_id', user.id)
    .select()

    if (error) throw error;
    return data 
    } catch (error) {
        throw new Error(error.message)
    }
}
//  UPDATE TICKET FOR USER
export const deleteTicket = async (id)=> {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('User not logged in')

    try {

    const { error } = await supabase
    .from('tickets')
    .delete()
    .eq("id", id)
    .eq('user_id', user.id)

    if (error) throw error;
    return 
    } catch (error) {
        throw new Error(error.message)
    }
}
