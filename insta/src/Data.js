export const getCategory = (index) => {

    const arr = [
        'Lifestyle',
        'Fashion',
        'Art',
        'Photography',
        'Music',
        'Dance',
        'Pets',
        'Entertainment',
        'Tech',
        'Automobiles',
        'Vlogs',
        'Gaming',
        'Education',
        'Fitness',
        'Sports',
        'Makeup',"Books"
    ]
    if(index===-1)
    {
        return arr;
    }
    else{
        return arr[index];
    }
   
};

export const BACKEND_URL='http://localhost:3005';
 export const s3Domain = 'https://signedayush.s3.ap-south-1.amazonaws.com';
